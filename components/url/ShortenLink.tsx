import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShortenLinkProps {
    url: string;
    loading?: boolean;
}

const ShortenLink = ({ url, loading }: ShortenLinkProps) => {
    const [copied, setCopied] = useState(false)

    if (loading) {
        return (
            <div className="flex items-center gap-3 p-2 bg-white rounded-xl border shadow-sm border-slate-100 w-full animate-pulse">
                <div className="flex-1 h-10 bg-slate-100 rounded-lg"></div>
                <div className="h-10 w-10 bg-slate-100 rounded-lg"></div>
            </div>
        )
    }

    if (!url) return null

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        })
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm w-full transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-2">
            <div className="flex-1 w-full flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg border border-slate-100 overflow-hidden group">
                <ExternalLink className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <Link
                    className='text-slate-700 font-medium truncate hover:text-blue-600 transition-colors'
                    href={url}
                    target='_blank'
                >
                    {url}
                </Link>
            </div>

            <Button
                onClick={copyToClipboard}
                className={cn(
                    "w-full sm:w-auto transition-all duration-300",
                    copied ? "bg-green-600 hover:bg-green-700" : "bg-slate-900 hover:bg-slate-800"
                )}
            >
                {copied ? (
                    <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                    </>
                ) : (
                    <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                    </>
                )}
            </Button>
        </div>
    )
}

export default ShortenLink