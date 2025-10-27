"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, HandHeart, HardDriveDownload, HeartHandshake, MessageCircleWarning } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";

import { CopyButton } from "@/components/CopyButton";
import { RefineButton } from "@/components/RefineButton";

import { check, getChromeVersion } from "@/lib/utils";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { useDownload } from "@/hooks/useDownload";

export default function Home() {

  const [isSupported, setIsSupported] = useState(false);
  const [isAvailable, setIsAvailableModels] = useState<string>("downloadable");

  const { progress, isDownloading, startDownload } = useDownload(550);

  function download() {
    startDownload();
  }


  useEffect(() => {
    setIsSupported(getChromeVersion(138));
    (async () =>
      setIsAvailableModels(await check())
    )();
  }, []);

  return (
    <WavyBackground className="w-full min-h-screen flex flex-col items-center">
      <div className="h-20 w-full p-3 flex gap-1.5">
        <Button size="sm" variant="outline" asChild>
          <Link href="https://developer.chrome.com/docs/ai/prompt-api" target="_blank" rel="noopener noreferrer">
            <HandHeart className="text-pink-800" />
            Feedback
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          className="gap-2 flex items-center justify-center text-sm ml-auto"
        >
          <Link href="https://github.com/aghamou" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </Link>
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link href="https://developer.chrome.com/docs/ai/prompt-api" target="_blank" rel="noopener noreferrer">
            Check API docs
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
      {isSupported ? <div className="w-full max-w-2xl px-3 md:px-0">
        <Item variant="outline" className="bg-linear-to-br from-amber-950 to-zinc-950 border-none">
          <ItemMedia variant="icon" className="bg-amber-900">
            <MessageCircleWarning />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              This is just a validation step.
            </ItemTitle>
            <ItemDescription>
              We&apos;re building a full Chrome extension around this concept.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline" asChild>
              <Link href="https://cerebric.fillout.com/join-waitlist" target="_blank" rel="noopener noreferrer">
                Join the waitlist
                <ArrowUpRight />
              </Link>
            </Button>
          </ItemActions>
        </Item>
      </div> : <div className="w-full max-w-4xl px-3 md:px-0">
        <Item variant="outline" className="bg-linear-to-br from-red-950 to-zinc-950 border-none">
          <ItemMedia variant="icon" className="bg-red-900">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.88 21.94 15.46 14" /><path d="M21.17 8H12" /><path d="M3.95 6.06 8.54 14" /><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>It&apos;s not you, it&apos;s your browser, please use Chrome!</ItemTitle>
            <ItemDescription>
              If you&apos;re already using Chrome, make sure it&apos;s updated to Chrome 138 or newer.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline" asChild>
              <Link href="https://developer.chrome.com/docs/ai/prompt-api" target="_blank" rel="noopener noreferrer">
                Check API docs
                <ArrowUpRight />
              </Link>
            </Button>
          </ItemActions>
        </Item>
      </div>
      }
      <main className="w-full max-w-2xl flex flex-1 flex-col gap-12 relative z-10 px-3 items-center justify-center mb-20">
        <div className="flex flex-col mt-12 items-center gap-4">
          <h1 className="text-center text-5xl md:text-7xl font-bold tracking-tighter">
            Just a better prompt
          </h1>
          <h4 className="text-center text-sm md:text-base font-medium max-w-xl text-pretty md:text-nowrap">
            Runs in your browser using Chrome&apos;s AI and
            costs absolutely nothing.
            <br />
            No accounts, no paywalls, no BS.
          </h4>
        </div>
        {isSupported && isAvailable === "available" ?
          <div className="group flex flex-col gap-2 pb-1.5 pr-1.5 bg-transparent backdrop-blur-3xl w-full rounded-lg border border-foreground/20 transition-all">
            <div className="relative flex flex-1 items-center">
              <Textarea
                id="prompt-input"
                placeholder="Start typing..."
                className="resize-none border-none dark:bg-transparent focus-visible:border-none focus-visible:ring-0"
              />
            </div>
            <div className="flex h-full p-0 justify-end items-end gap-2">
              <CopyButton />
              <RefineButton />
            </div>
          </div> : isSupported && isAvailable === "unavailable" ?
            <div className="w-full max-w-md p-4 bg-linear-to-br from-red-950 to-zinc-950 border-none rounded-lg flex flex-col items-center gap-3">
              <HeartHandshake className="text-red-500 size-8" />
              <h3 className="text-center font-semibold text-lg">
                The Language Model API is currently unavailable.
              </h3>
              <p className="text-center text-sm">
                This feature relies on Chrome&apos;s experimental Language Model API, which is not always available. Please try again later.
              </p>
            </div> : isSupported && isAvailable === "downloadable" ?
              <div>
                <Button variant={"outline"} size="lg" className="w-fit rounded-full" onClick={download} disabled={isDownloading}>
                  Download Language Model API
                  {isDownloading ?
                    <AnimatedCircularProgressBar value={progress}
                      gaugePrimaryColor="#fbbf24"
                      gaugeSecondaryColor="#374151"
                      className="size-6 text-[10px] ml-2"
                    /> :
                    <HardDriveDownload />}
                </Button>
              </div>
              :
              <Button variant={"outline"} size="lg" className="w-fit rounded-full" asChild>
                <Link href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">
                  Get Google Chrome
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.88 21.94 15.46 14" /><path d="M21.17 8H12" /><path d="M3.95 6.06 8.54 14" /><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /></svg>
                </Link>
              </Button>
        }
      </main>
    </WavyBackground >
  );
}