import {
  PromptInput,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputToolbar,
  PromptInputTools,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectValue,
} from "@/components/prompt-input";
import { UI_MESSAGES } from "@/lib/consts";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  language: string;
  onLanguageChange: (value: string) => void;
}

export function ChatInput({
  input,
  onInputChange,
  onSubmit,
  isLoading,
  language,
  onLanguageChange,
}: ChatInputProps) {
  const inputTrimmed = input.trim();
  const inputSubmitIsDisabled = isLoading || inputTrimmed === "";

  return (
    <PromptInput onSubmit={onSubmit} className="relative pr-8">
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputModelSelect
            value={language}
            onValueChange={onLanguageChange}
          >
            <PromptInputModelSelectTrigger size="sm" className="h-8">
              <PromptInputModelSelectValue placeholder="Idioma" />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              <PromptInputModelSelectItem value="es">
                Español
              </PromptInputModelSelectItem>
              <PromptInputModelSelectItem value="en">
                English
              </PromptInputModelSelectItem>
              <PromptInputModelSelectItem value="pt">
                Português
              </PromptInputModelSelectItem>
              <PromptInputModelSelectItem value="fr">
                Français
              </PromptInputModelSelectItem>
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
      </PromptInputToolbar>
      <PromptInputTextarea
        placeholder={UI_MESSAGES.PLACEHOLDERS.INPUT}
        value={input}
        onChange={onInputChange}
        disabled={isLoading}
      />
      <PromptInputSubmit
        disabled={inputSubmitIsDisabled}
        className="absolute bottom-2 right-2"
      />
    </PromptInput>
  );
}
