import arcjet from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import ip from "@arcjet/ip";
import {
    type ArcjetDecision,
    type BotOptions,
    type EmailOptions,
    type ProtectSignupOptions,
    type SlidingWindowRateLimitOptions,
    detectBot,
    protectSignup,
    slidingWindow
} from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

// Email validation config for Arcjet.
// See: https://docs.arcjet.com/email-validation/configuration
const emailOptions = {
    mode: "LIVE", // Blocks requests. Use "DRY_RUN" to only log.
    // Blocks emails that are disposable, invalid, or have no MX records.
    block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
} satisfies EmailOptions;

// Bot detection config for Arcjet.
// See: https://docs.arcjet.com/bot-protection/configuration
const botOptions = {
    mode: "LIVE",
    allow: [], // Prevent bots from submitting the form.
} satisfies BotOptions;

// Rate limit config for Arcjet.
// See: https://docs.arcjet.com/rate-limiting/configuration
const rateLimitOptions = {
    mode: "LIVE",
    interval: "2m", // Count requests in a sliding window of 2 minutes.
    max: 5, // Allow 5 requests in that window.
} satisfies SlidingWindowRateLimitOptions<[]>;

// Signup protection config for Arcjet.
// Combines email, bot, and rate limit rules.
// See: https://docs.arcjet.com/signup-protection/configuration
const signupOptions = {
    email: emailOptions,
    bots: botOptions,
    rateLimit: rateLimitOptions,
} satisfies ProtectSignupOptions<[]>;

// Applies Arcjet security rules to a request (NextRequest).
async function protect(req: NextRequest): Promise<ArcjetDecision> {
    // Get the session to use user ID if authenticated.
    const session = await auth.api.getSession({ headers: req.headers });

    // Use user ID if logged in, otherwise fallback to IP address.
    let userId: string;
    if (session?.user.id) {
        userId = session.user.id;
    } else {
        userId = ip(req) || "127.0.0.1"; // Fallback to localhost IP if none.
    }

    // Special rule for sign-up requests.
    if (req.nextUrl.pathname.startsWith("/api/auth/sign-up")) {
        const body = await req.clone().json();

        // If email is present in the request body, run full email validations.
        if (typeof body.email === "string") {
            return arcjet
                .withRule(protectSignup(signupOptions))
                .protect(req, { email: body.email, fingerprint: userId });
        } else {
            // Otherwise, apply bot and rate-limit checks only.
            return arcjet
                .withRule(detectBot(botOptions))
                .withRule(slidingWindow(rateLimitOptions))
                .protect(req, { fingerprint: userId });
        }
    } else {
        // For all other authentication requests, only check bot protection.
        return arcjet
            .withRule(detectBot(botOptions))
            .protect(req, { fingerprint: userId });
    }
}

// Convert better-auth config to standard Next.js route handlers.
const authHandlers = toNextJsHandler(auth);

// Export GET handler directly.
export const { GET } = authHandlers;

/**
 * Wraps the POST handler with Arcjet protections.
 * Every POST request will pass through Arcjet before reaching better-auth logic.
 */
export const POST = async (req: NextRequest) => {
    const decision = await protect(req);

    console.log("Arcjet Decision:", decision);

    // If Arcjet denies the request, return an appropriate response.
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return new Response(null, { status: 429 }); // Too many requests
        } else if (decision.reason.isEmail()) {
            // Email was blocked for a reason
            let message: string;

            if (decision.reason.emailTypes.includes("INVALID")) {
                message = "Invalid email format. Please double-check for typos.";
            } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
                message = "Disposable email addresses are not allowed.";
            } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
                message =
                    "Your email domain has no MX records. Please check for typos.";
            } else {
                message = "Invalid email address.";
            }

            return Response.json({ message }, { status: 400 });
        } else {
            // Denied for another reason (e.g., bot, IP, etc.)
            return new Response(null, { status: 403 });
        }
    }

    // If allowed, continue to the original POST handler
    return authHandlers.POST(req);
};
