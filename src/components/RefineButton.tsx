import React from 'react'
import { Sparkles } from 'lucide-react'

import { Button } from './ui/button'
import { refinePrompt } from '@/lib/utils'
import { Spinner } from './ui/spinner';



function RefineButton(isRefiningProps: { isRefining: boolean, setIsRefining: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { isRefining, setIsRefining } = isRefiningProps;

    const handleRefine = async () => {
        if (isRefining) return;
        setIsRefining(true);
        await refinePrompt();
        setIsRefining(false);
    };

    return (
        <Button onClick={handleRefine} size={"sm"} disabled={isRefining} aria-label="Refine prompt">
            {isRefining ? <Spinner /> : <Sparkles />}
            Refine
        </Button>
    )
}

export { RefineButton }