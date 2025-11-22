import { Message, MessageContent } from "@/components/message";
import { Response } from "@/components/response";
import { type ChatMessage as ChatMessageType } from "@/lib/types";

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const { role, content } = message;

  return (
    <Message from={role}>
      <MessageContent>
        <Response>{content}</Response>
      </MessageContent>
    </Message>
  );
}
