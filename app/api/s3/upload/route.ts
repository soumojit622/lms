// app/api/s3/upload/route.ts
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { fixedWindow } from "arcjet";
import arcjet from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { fileUploadSchema } from "./schema";

const aj = arcjet.withRule(
    fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 5,
    })
);

export async function POST(request: Request) {
    const session = await requireAdmin();

    try {
        const decision = await aj.protect(request, {
            fingerprint: session?.user.id as string,
        });

        if (decision.isDenied()) {
            return NextResponse.json(
                { error: "You are not allowed to perform this action" },
                { status: 429 }
            );
        }

        const body = await request.json();
        const validation = fileUploadSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const { fileName, contentType, size } = validation.data;
        const uniqueKey = `${uuidv4()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
            ContentType: contentType,
            ContentLength: size,
            Key: uniqueKey,
        });

        const presignedUrl = await getSignedUrl(S3, command, {
            expiresIn: 360,
        });

        return NextResponse.json({ presignedUrl, key: uniqueKey });
    } catch (error) {
        console.error("Upload error:", {
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null,
        });

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}
