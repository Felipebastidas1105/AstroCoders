import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import { type NextRequest, NextResponse } from "next/server";

import { LEGAL_ASSISTANT_PROMPTS, getDocumentsContext } from "@/lib/prompts";
import { GAME_CONFIG } from "@/lib/consts";
import { GenerateStoryRequest } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const {
      userMessage,
      conversationHistory,
      isStart,
      language,
    }: GenerateStoryRequest = await request.json();

    const getLanguageInstruction = (lang?: string) => {
      const map: Record<string, string> = {
        es: "Responde en español.",
        en: "Responde en inglés.",
        pt: "Responde en portugués.",
        fr: "Responde en francés.",
      };
      return map[lang ?? "es"] ?? "Responde en español.";
    };

    let prompt: string = `${LEGAL_ASSISTANT_PROMPTS.INITIAL_RESPONSE}\n${getLanguageInstruction(language)}`;

    if (!isStart) {
      const documentsContext = getDocumentsContext();
      prompt = `${LEGAL_ASSISTANT_PROMPTS.CONTINUE_CONVERSATION(documentsContext, userMessage)}\n${getLanguageInstruction(language)}`;
    }

    const { text } = await generateText({
      model: google("gemini-2.5-flash-lite"),
      prompt,
    });

    const [narrative, imagePrompt] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);

    return NextResponse.json({ narrative, imagePrompt });
  } catch (error) {
    console.error("Error generating story:", error);
    return NextResponse.json(
      { error: "Error generating story" },
      { status: 500 },
    );
  }
}
