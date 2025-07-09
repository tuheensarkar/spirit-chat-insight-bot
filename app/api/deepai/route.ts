import { NextResponse } from "next/server"

const DEEPAI_API_KEY = "828f1f9d-0f5b-4ec2-86a5-e9b31ed48196"
const DEEPAI_API_URL = "https://api.deepai.org/api/text2img"

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt: string }

  // Build a richer prompt for better results
  const enhancedPrompt = `Beautiful inspirational Bible verse quote card: ${prompt}. Elegant serif typography, soft pastel gradient background, peaceful theme, high quality, 1024x1024`

  try {
    const formData = new FormData()
    formData.append("text", enhancedPrompt)

    const response = await fetch(DEEPAI_API_URL, {
      method: "POST",
      headers: { "Api-Key": DEEPAI_API_KEY },
      body: formData,
    })

    if (!response.ok) throw new Error("DeepAI request failed")

    const data = await response.json()

    // DeepAI’s free tier can answer with an error JSON even on 200
    if (data.output_url) {
      return NextResponse.json({ imageUrl: data.output_url })
    } else {
      // e.g. out-of-credits or other issue → fall back to canvas
      return NextResponse.json({ useCanvas: true })
    }
  } catch (err) {
    // On network error / quota exceeded etc. → fall back to canvas
    console.warn("DeepAI fallback:", (err as Error).message)
    return NextResponse.json({ useCanvas: true })
  }
}
