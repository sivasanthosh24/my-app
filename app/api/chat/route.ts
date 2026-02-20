import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools'; 

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ", messages);

  const context = `
  You are a certified fitness coach.
  You help users with fat loss, muscle gain, strength training, and healthy lifestyle habits.
  You recommend safe workouts, proper form, progressive overload, and balanced nutrition.
  Avoid extreme dieting or unsafe supplement advice.
  `;

  const systemPrompt = `
  You are a professional fitness coach.
  Give practical, science-based fitness advice.
  Be motivating and supportive.
  Keep responses crisp, maximum 3 sentences.
  Following is the context:
  ${context}
  `;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}