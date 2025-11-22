# LegalIA — AstroCoders

Asistente legal que responde preguntas basadas en documentos locales, con interfaz de chat y generación de respuestas usando el modelo Gemini a través del AI SDK.

## Descripción

- Interfaz de bienvenida que redirige al chat (`src/app/page.tsx`).
- Chat conversacional con selección de idioma y envío de mensajes (`src/app/chat/page.tsx`).
- API que genera respuestas usando `@ai-sdk/google` y el AI SDK (`src/app/api/generate-story/route.ts`).
- Lectura del contexto de documentos locales listados en `src/documents` para guiar las respuestas (`src/lib/prompts.ts`).
- UI construida con componentes propios, Radix UI y Tailwind CSS v4.

## Tecnologías

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Radix UI
- AI SDK (`ai`) con `@ai-sdk/google` (Gemini)
- Biome (lint y formato)

## Arquitectura

- Páginas
  - `src/app/page.tsx`: landing que navega al chat usando `useRouter` (`src/app/page.tsx:6`).
  - `src/app/chat/page.tsx`: vista principal del chat; renderiza mensajes y el input.
- API
  - `src/app/api/generate-story/route.ts`: endpoint `POST` que construye el prompt y llama a Gemini (`src/app/api/generate-story/route.ts:36`).
- Lógica
  - `src/app/hooks/use-chat.ts`: estado de conversación, envío y arranque del chat (`src/app/hooks/use-chat.ts:18`).
- Librerías de soporte
  - `src/lib/prompts.ts`: prompts del asistente legal y lectura de archivos en `src/documents`.
  - `src/lib/consts.ts`: textos de UI y configuración del separador de imagen.
  - `src/lib/types.ts`: tipos de mensajes y payloads de API.
- UI
  - `src/components/*`: componentes de mensaje, input, conversación y utilidades (`src/components/conversation.tsx`, `src/components/message.tsx`, `src/components/prompt-input.tsx`).

## Flujo de funcionamiento

1. El usuario entra al landing y pulsa “Hablar con LegalIA” (`src/app/page.tsx:24`).
2. Se abre el chat y se inicializa una respuesta de bienvenida del asistente (`src/app/hooks/use-chat.ts:14`).
3. Cada envío manda un `POST` a `/api/generate-story` con el mensaje, historial y el idioma (`src/app/hooks/use-chat.ts:65`).
4. El endpoint arma el prompt con documentos disponibles y llama al modelo Gemini (`src/app/api/generate-story/route.ts:29,36`).
5. La respuesta se muestra en el chat con los componentes de UI (`src/app/componentes/game-message.tsx:11`).

## Requisitos

- Node.js 18+ (recomendado LTS)
- Clave de API de Google para Gemini (`GOOGLE_API_KEY`).

## Configuración de entorno

1. Crear un archivo `.env.local` en la raíz del proyecto.
2. Añadir la variable requerida:

```bash
GOOGLE_API_KEY=tu_clave_de_api
```

> La clave es necesaria para `@ai-sdk/google`.

## Instalación

```bash
npm install
```

## Scripts

- `npm run build`: compila la aplicación.
- `npm start`: arranca en modo producción.
- `npm run lint`: revisión estática con Biome.
- `npm run format`: formatea el código con Biome.

> Nota: en este proyecto evitamos usar `npm run dev` por política.

## Documentos legales

- Ubicación: `src/documents`.
- Formatos soportados para el listado: `pdf`, `txt`, `md`.
- El sistema lista los nombres de los archivos para construir el contexto del prompt (`src/lib/prompts.ts:4`).

## Componentes clave

- `Conversation` y `Message`: render del hilo y burbujas (`src/components/conversation.tsx`, `src/components/message.tsx`).
- `PromptInput`: input con selector de idioma (`src/components/prompt-input.tsx`).
- `ChatInput`, `ChatMessage`, `ChatLoader`: composición específica del chat (`src/app/componentes/*`).

## Convenciones

- TypeScript estricto y rutas con alias (`tsconfig.json`).
- Tailwind CSS v4 en `src/app/globals.css`.
- Lint y formato con Biome (`biome.json`).

## Limitaciones actuales

- El modelo no lee el contenido de los PDFs de forma nativa; el prompt usa el listado de archivos como contexto. Integrar extracción de texto mejoraría la precisión.
- No hay autenticación ni control de acceso.

## Próximos pasos sugeridos

- Extracción de texto de PDFs (`pdf.js` o servicios de extracción) y citación con referencias más precisas.
- Persistencia del historial de conversación.
- Soporte multi-documento con selección en UI.

---

Equipo: AstroCoders — Hackathon Caldas 2025
