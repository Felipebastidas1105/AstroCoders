import { Message, MessageContent } from "@/components/message";
import { Response } from "@/components/response";
import { type GameMessage as GameMessageType } from "@/lib/types";

export function GameMessage({ message }: { message: GameMessageType }) {
  const { role, content } = message;

  return (
    <Message from={role}>
      <MessageContent> 
        <Response>
          {content}
        </Response>
      </MessageContent>
    </Message>
  )
}