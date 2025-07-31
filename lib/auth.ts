import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP, admin } from "better-auth/plugins";
import { resend } from "./resend";

// Custom branded email template
const buildOTPEmail = (otp: string) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; padding: 1.5rem;">
    <h1 style="color: #da7756; font-size: 24px; margin-bottom: 0.5rem;">ThinkLab Verification</h1>
    <p style="font-size: 16px; margin: 1rem 0;">Hi there 👋</p>
    <p style="font-size: 16px;">
      Use the code below to verify your email address and complete your sign-in:
    </p>
    <div style="margin: 1.5rem 0; font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #000;">
      ${otp}
    </div>
    <p style="font-size: 14px; color: #555;">
      This code will expire in a few minutes. If you didn’t request this email, you can safely ignore it.
    </p>
    <hr style="margin-top: 2rem;" />
    <p style="font-size: 12px; color: #999;">
      © ${new Date().getFullYear()} ThinkLab. All rights reserved.
    </p>
  </div>
`;

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_SECRET,
        },
    },

    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                await resend.emails.send({
                    from: "ThinkLab <onboarding@resend.dev>",
                    to: [email],
                    subject: "Your ThinkLab Verification Code",
                    html: buildOTPEmail(otp),
                });
            },
        }),

        admin(), // Adds optional admin UI/tools
    ],
});
