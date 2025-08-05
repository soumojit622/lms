import "server-only";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

/**
 * `requireAdmin` is an async function that checks if the current user has an active session and if their role is 'admin'.
 * It uses `React.cache` to memoize the result of fetching the session during a single server render cycle.
 *
 * @description
 * Why use `React.cache`?
 * In a Next.js application using Server Components, it's common for multiple components in the same render tree
 * to access the same data, like the user's session. Without `cache`, every call to `requireAdmin`
 * (e.g., from different layouts or components) would trigger repeated calls to `auth.api.getSession`,
 * potentially causing multiple database or auth service queries for the same request.
 *
 * `React.cache` wraps the function and ensures that, during a single server render, the function
 * runs only once. Any subsequent calls to `requireAdmin` during the same cycle will return
 * the cached result (the user session or a redirect), significantly improving performance.
 *
 * @returns {Promise<import("better-auth").Session | never>} - Returns the session if the user is an admin.
 * Otherwise, redirects to '/login' or '/not-admin' and the function never resolves.
 */

export const requireAdmin = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return redirect("/login");
    }

    if (session.user.role !== "admin") {
        return redirect("/not-admin");
    }

    return session;
});
