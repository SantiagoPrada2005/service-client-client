import { NextRequest, NextResponse} from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface PromptRequest {
  prompt: string;
}


// Define proper types for Gemini API
interface GeminiChatMessage {
  role: string;
  parts: { text: string }[];
}

type ConversationEntry = [string, string]; // [userPrompt, modelResponse]

// GoogleGenerativeAI required config
const configuration = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

if (!process.env.GEMINI_API_KEY) {
  console.warn("Warning: API_KEY environment variable is not set");
}

// Model initialization
const modelId = "gemini-2.0-flash";
const model = configuration.getGenerativeModel({ model: modelId });

//These arrays are to maintain the history of the conversation
const conversationContext: ConversationEntry[] = [["Me llamo Santiago", "Genial."]];

// Controller function to handle chat conversation
export const generateResponse = async (req: NextRequest) => {
  try {
    // Parse the request body as JSON
    const body = await req.json() as PromptRequest;
    const { prompt } = body;
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Build chat history in the format Gemini expects
    const chatHistory: GeminiChatMessage[] = [];
    
    // Restore the previous context
    for (const [inputText, responseText] of conversationContext) {
      chatHistory.push({ 
        role: "user", 
        parts: [{ text: inputText }]
      });
      chatHistory.push({ 
        role: "model", 
        parts: [{ text: responseText }]
      });
    }

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(prompt);
    
    const response = await result.response;
    const responseText = response.text();

    // Stores the conversation
    conversationContext.push([prompt, responseText]);
    return NextResponse.json({ response: responseText });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: err instanceof Error ? err.message : String(err) 
    }, { status: 500 });
  }
};