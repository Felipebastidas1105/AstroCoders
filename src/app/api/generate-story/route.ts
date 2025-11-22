import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

import { type NextRequest, NextResponse } from 'next/server';

import { LEGAL_ASSISTANT_PROMPTS, getDocumentsContext } from '@/lib/prompts';
import { GAME_CONFIG } from '@/lib/consts'
import { GenerateStoryRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { userMessage, conversationHistory, isStart }: GenerateStoryRequest = await request.json();

    let prompt: string = LEGAL_ASSISTANT_PROMPTS.INITIAL_RESPONSE;

    if (!isStart) {
      const documentsContext = getDocumentsContext();
      prompt = LEGAL_ASSISTANT_PROMPTS.CONTINUE_CONVERSATION(documentsContext, userMessage);
    }

    const { text } = await generateText({
      model: google('gemini-2.5-flash-lite'),
      prompt
    })

    const [narrative, imagePrompt] = text.split(GAME_CONFIG.IMAGE.SEPARATOR);

    return NextResponse.json({ narrative, imagePrompt });
    
  } catch (error) {
    console.error('Error generating story:', error);
    return NextResponse.json({ error: 'Error generating story' }, { status: 500 });
  }
}