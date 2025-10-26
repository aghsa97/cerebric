import React from 'react'
import { Check, Copy } from 'lucide-react'

import { Button } from './ui/button'

import { toast } from "sonner";

function CopyButton() {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = async () => {
        const textareaEl = document.getElementById("prompt-input") as HTMLTextAreaElement;
        const refinedPrompt = textareaEl.value.trim();
        if (!refinedPrompt) return;

        try {
            await navigator.clipboard.writeText(refinedPrompt);
            toast.success("Copied to clipboard!");
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
            toast.error("Failed to copy.");
        }
    };
    return (
        <Button variant="outline" size="icon-sm" onClick={handleCopy} disabled={isCopied}>
            {isCopied ? <Check /> : <Copy />}
        </Button>
    )
}

export { CopyButton }