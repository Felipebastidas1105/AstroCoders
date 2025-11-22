'use client'

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/conversation";
import { GameInput } from "../componentes/game-input";
import { GameLoader } from "../componentes/game-loader";
import { GameMessage } from "../componentes/game-message";
import { useZombieGame } from "../hooks/use-chat";
import { useState, useEffect, useRef } from "react";
import { type GameMessage as GameMessageType } from "@/lib/types";

export default function Home() {
  const { messages, input, isLoading, handleSubmit, handleInputChange } = useZombieGame();
  const [image, setImage] = useState<string | undefined>('');
  const lastMessageRef = useRef<GameMessageType | null>(null);


  useEffect(() => {
    if (messages.length > 0 && !image) {
      const firstMessage = messages[0];
      if (firstMessage.image && !firstMessage.imageLoading) {
        setImage(firstMessage.image.base64Data);
      }
    }
  }, [messages, image]);


  return (
    <div className="font-sans h-screen mx-auto overflow-hidden bg-gradient-to-t from-[var(--color-gradient-principal)] to-[var(--color-gradient-secondary)]">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent className="max-w-xl mx-auto">
            {
              messages.map(message => (
                <GameMessage key={message.id} message={message} />
              ))
            }
            {isLoading && <GameLoader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="max-w-2xl w-full mx-auto pb-4">
          <GameInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
