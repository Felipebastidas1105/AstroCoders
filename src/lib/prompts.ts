import fs from "fs";
import path from "path";

export const getDocumentsContext = (): string => {
  const docsDir = path.join(process.cwd(), "src", "documents");
  let files: string[] = [];
  try {
    files = fs.readdirSync(docsDir);
  } catch {
    return "No se encontraron documentos.";
  }
  const docFiles = files.filter((f) => /\.(pdf|txt|md)$/i.test(f));
  if (docFiles.length === 0) return "No se encontraron documentos.";
  return docFiles.map((f) => `- ${f}`).join("\n");
};

export const LEGAL_ASSISTANT_PROMPTS = {
  INITIAL_RESPONSE: `Eres un asistente legal que analiza documentos y responde consultas jurídicas.

Genera una respuesta inicial profesional donde te presentas y explicas brevemente que puedes ayudar a analizar documentos legales y responder dudas al respecto.

Sé conciso y directo. Presenta tu función y termina SIEMPRE preguntando qué documento necesita analizar o qué duda legal tiene.`,

  CONTINUE_CONVERSATION: (
    documentsContext: string,
    userMessage: string,
  ) => `Eres un asistente legal que analiza documentos y responde consultas jurídicas.

Documentos disponibles:
${documentsContext}

El usuario acaba de preguntar: "${userMessage}"

Responde la consulta basándote ÚNICAMENTE en los documentos proporcionados. Sé claro y preciso en MÁXIMO 2 párrafos cortos.

Cita los artículos o secciones específicas del documento que respaldan tu respuesta. Si la información no está en los documentos, indícalo claramente.

Termina SIEMPRE preguntando si necesita aclaración adicional o tiene otra consulta sobre los documentos.`,
};
