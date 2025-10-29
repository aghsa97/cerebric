import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LanguageModelMessage = { role: string; content: string };
type LanguageModelType = {
  promptStreaming(messages: LanguageModelMessage[]): AsyncIterable<string>;
  destroy(): void;
};
declare global {
  interface GlobalThis {
    LanguageModel?: {
      availability?: () => Promise<string>;
      create?: (options?: unknown) => Promise<LanguageModelType>;
      destroy?: () => void;
    };
  }
}

export const LanguageModel = (
  globalThis as typeof globalThis & {
    LanguageModel?: {
      availability?: () => Promise<string>;
      create?: (options?: unknown) => Promise<LanguageModelType>;
      destroy?: () => void;
    };
  }
).LanguageModel;

export async function check() {
  if ("LanguageModel" in self && LanguageModel?.availability) {
    const availability = await LanguageModel.availability();
    console.log("LanguageModel API supported:", availability);
    return availability;
  } else {
    console.log("LanguageModel API not supported in this browser.");
    return "unavailable";
  }
}

async function initLanguageModel() {
  const avail = await check();
  if (avail === "unavailable" || !LanguageModel?.create) {
    toast.error("LanguageModel API is unavailable in this browser.");
    return;
  }
  const session = await LanguageModel.create({
    initialPrompts: [
      {
        role: "system",
        content: `SYSTEM:
You are a prompt engineer. Your goal is to provide better prompts based on the user’s 
initial prompt. Each answer should include a revised, improved prompt only and nothing more than the improved prompt. Your improvements should focus on clarity, specificity, and detail to ensure the best possible output from an AI model.
Here are some guidelines to follow when refining prompts:

1. Include a role definition at the start of the conversation to set the context.
2. Be Specific: Clearly define what you want the AI to do. Avoid vague terms.

finally, always output only the refined prompt without any additional commentary or explanation as plaintext.
`,
      },
    ],
  });

  console.log("LanguageModel initialized.");
  return session;
}

export async function refinePrompt() {
  const textareaEl = document.getElementById(
    "prompt-input"
  ) as HTMLTextAreaElement;
  const promptText = textareaEl.value.trim();

  if (!promptText) {
    console.warn("Please enter a prompt to refine.");
    toast.error("Please enter a prompt to refine.");
    return;
  }

  const session = await initLanguageModel();
  if (!session) {
    console.error("Cannot refine: LanguageModel API unavailable.");
    toast.error("Cannot refine: LanguageModel API unavailable.");
    return;
  }

  try {
    const responseStream = session.promptStreaming([
      {
        role: "user",
        content: `Refine the following user prompt for optimal clarity, detail, and effectiveness in a creative generation task. Return ONLY the refined prompt, without any introductory or concluding text: "${promptText}"`,
      },
    ]);

    // Clear the initial message to start writing the refined prompt
    textareaEl.value = "";

    for await (const chunk of responseStream) {
      if (chunk) {
        textareaEl.value += chunk;
        textareaEl.scrollTop = textareaEl.scrollHeight;
      }
    }
    textareaEl.value = textareaEl.value.trim();
  } catch (err) {
    console.error("LanguageModel streaming error:", err);
    toast.error("Error refining prompt: " + String(err));
  } finally {
    if (session) {
      session.destroy();
    }
  }
}

export const getChromeVersion = (minVersion: number = 138): boolean => {
  // Check if running in a browser environment
  if (typeof navigator === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent;

  // Check if it's Chrome (and not Edge, Opera, or other Chromium-based browsers)
  const isChrome =
    /Chrome/.test(userAgent) &&
    /Google Inc/.test(navigator.vendor) &&
    !/Edg/.test(userAgent) &&
    !/OPR/.test(userAgent);

  if (!isChrome) {
    return false;
  }

  // Extract Chrome version
  const chromeVersionMatch = userAgent.match(/Chrome\/(\d+)/);

  if (!chromeVersionMatch) {
    return false;
  }

  const chromeVersion = parseInt(chromeVersionMatch[1], 10);

  return chromeVersion >= minVersion;
};
