import { useState, useEffect } from "react";
import { toast } from "sonner";

import { LanguageModel } from "@/lib/utils";

export function useDownload() {
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const startDownload = async () => {
    toast.info("Starting model download...");
    setProgress(0);
    setIsDownloading(true);
  };

  async function dowloadModel() {
    if (!LanguageModel?.create) {
      console.error("LanguageModel API is not available.");
      toast.error("LanguageModel API is not available.");
      setIsDownloading(false);
      return;
    }
    const session = await LanguageModel.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      monitor(m: any) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        m.addEventListener("downloadprogress", (e: any) => {
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
  }, [isDownloading]);

  return { progress, isDownloading, startDownload };
}
