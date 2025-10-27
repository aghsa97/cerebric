import { useState, useEffect } from "react";

type LanguageModelMessage = { role: string; content: string };
type LanguageModelResponse = string;
type LanguageModelType = {
  prompt(messages: LanguageModelMessage[]): Promise<LanguageModelResponse>;
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

const LanguageModel = (
  globalThis as typeof globalThis & {
    LanguageModel?: {
      availability?: () => Promise<string>;
      create?: (options?: unknown) => Promise<LanguageModelType>;
      destroy?: () => void;
    };
  }
).LanguageModel;

export function useDownload(speed = 100) {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const startDownload = async () => {
    console.log("Starting fake download...");
    setProgress(0);
    setIsDownloading(true);
  };

  async function dowloadModel() {
    if (!LanguageModel?.create) {
      console.error("LanguageModel API is not available.");
      setIsDownloading(false);
      return;
    }
    const session = await LanguageModel.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      monitor(m: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        m.addEventListener("downloadprogress", (e: any) => {
          console.log(`Downloaded ${e.loaded * 100}%`);
          console.log("event", e);
          console.log("monitor", m);
          setProgress(e.loaded * 100);
        });
      },
    });
    session.destroy();
    setIsDownloading(false);
  }

  useEffect(() => {
    if (!isDownloading) return;
    async function download() {
      await dowloadModel();
    }
    download();
  }, [isDownloading, speed]);

  return { progress, isDownloading, startDownload };
}
