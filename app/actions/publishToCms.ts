"use server";

import { auth } from "@/auth";

export async function publishToCms(jsonString: string) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // 1. Parse the JSON string from the AI
    let data;
    try {
      data = JSON.parse(jsonString);
    } catch (parseError) {
      return { success: false, error: "Invalid JSON format from AI" };
    }

    // 2. Validate required fields
    if (!data.title || !data.slug || !data.content) {
      return { success: false, error: "Missing required fields: title, slug, or content" };
    }

    // 3. Push to Directus CMS
    const directusUrl = process.env.DIRECTUS_URL || "http://directus:8055";
    const token = process.env.DIRECTUS_TOKEN;

    if (!token) {
      return { success: false, error: "Directus token not configured" };
    }

    const response = await fetch(`${directusUrl}/items/case_studies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        slug: data.slug,
        status: data.status || "draft",
        content: data.content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("[DIRECTUS ERROR]", errorData);
      return { success: false, error: "Failed to publish to Directus" };
    }

    const result = await response.json();
    return { success: true, data: result.data, message: "Successfully published to CMS!" };

  } catch (error) {
    console.error("[PUBLISH ACTION ERROR]", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
