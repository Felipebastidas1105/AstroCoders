'use client'

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton
} from '@/components/conversation'
import { ChatInput } from '../componentes/chat-input'
import { ChatLoader } from '../componentes/chat-loader'
import { ChatMessage } from '../componentes/chat-message'
import { useChat } from '../hooks/use-chat'
import { useState, useEffect, useRef } from 'react'
import { type ChatMessage as ChatMessageType } from '@/lib/types' 

export default function Home () {
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    language,
    setLanguage
  } = useChat()
  const [image, setImage] = useState<string | undefined>('')
  const lastMessageRef = useRef<ChatMessageType | null>(null)

  useEffect(() => {
    if (messages.length > 0 && !image) {
      const firstMessage = messages[0]
      if (firstMessage.image && !firstMessage.imageLoading) {
        setImage(firstMessage.image.base64Data)
      }
    }
  }, [messages, image])

  return (
    <div className='font-sans h-screen mx-auto overflow-hidden bg-gray-950'>
      {/* Contenedor principal en fila */}
      <div className='flex h-full'>
        {/* 🖼 Panel izquierdo: imagen */}
        <div className='hidden md:flex items-center justify-center w-1/3 bg-transparent p-4'>
          <img
            src='https://res.cloudinary.com/dxnsmwmgv/image/upload/e_background_removal/f_png/v1763834780/justicia_bfee2y.jpg'
            alt='Ilustración'
            className='max-h-full w-auto object-contain'
          />
        </div>

        {/* 💬 Panel derecho: chat */}
        <div className='flex flex-col flex-1'>
           <Conversation>
            <ConversationContent className='max-w-xl mx-auto'>
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                />
              ))}
              {isLoading && <ChatLoader />}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <div className='max-w-2xl w-full mx-auto pb-4'>
            <ChatInput
              input={input}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              language={language}
              onLanguageChange={setLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}