import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';


export const maxDuration = 30;

export const runtime = 'edge';

export async function GET() {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
    
  const result = streamText({
      model: openai('gpt-4o'),
     prompt:prompt,
    });
    return result.toDataStreamResponse();
  } catch (error: unknown) {
    console.log(error)
//    if (error instanceof Error && 'response' in error) {
//      const { status, data, statusText } = (error as any).response;
 //     console.error('Error response:', { status, statusText, data });
 //     return NextResponse.json({ status, data }, { status });
//    } else {
//      console.error('An unexpected error occurred:', error);
   //   throw error;
 //   }
  }
}
