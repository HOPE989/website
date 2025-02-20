'use client'

import { type PortableTextComponentProps } from '@portabletext/react'
import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { ClientOnly } from '@/components/ClientOnly'
import { ElegantTooltip } from '@/components/ui/Tooltip'
import {Copy, CopyCheck} from "lucide-react";

export function PortableTextCodeBlock({
  value,
}: PortableTextComponentProps<{
  _key: string
  language: string
  code: string
  filename?: string
}>) {
  const [hasCopied, setHasCopied] = React.useState(false)
  const onClickCopy = React.useCallback(() => {
    navigator.clipboard
      .writeText(value.code)
      .then(() => {
        setHasCopied(true)
        setTimeout(() => {
          setHasCopied(false)
        }, 3000)
      })
      .catch(() => {
        console.error('Failed to copy code block')
      })
  }, [value.code])

  return (
    <div
      data-blockid={value._key}
      data-filename={value.filename}
      className="group relative mr-3 rounded-3xl border border-[--tw-prose-pre-border] bg-zinc-800/80 md:mr-0"
    >
      <ClientOnly>
        <>
          <div className="relative flex text-xs leading-6 text-slate-400">
            {Boolean(value.filename) && (
              <>
                <div className="mt-2 flex flex-none items-center border-b border-t border-t-transparent px-4 py-1 font-medium border-b-emerald-200 text-emerald-200">
                  {value.filename}
                </div>
                <div className="flex flex-auto overflow-hidden rounded-tr-3xl pt-2">
                  <div className="-mr-px flex-auto rounded-tl border border-zinc-500/30 bg-zinc-700/50" />
                </div>
              </>
            )}
            <div className="absolute right-0 top-2 flex h-8 items-center pr-4">
              <div className="relative -mr-0.5 flex">
                <ElegantTooltip content="复制">
                  <button
                    type="button"
                    className="text-zinc-500 hover:text-zinc-400"
                    onClick={onClickCopy}
                  >
                    {hasCopied ? (
                        <CopyCheck className="h-5 w-5"/>
                    ) : (
                        <Copy className="h-5 w-5"/>
                    )}
                  </button>
                </ElegantTooltip>
              </div>
            </div>
          </div>

          <SyntaxHighlighter
            language={value.language}
            showLineNumbers
            useInlineStyles={false}
            codeTagProps={{
              style: {},
              className: `language-${value.language}`,
            }}
          >
            {value.code}
          </SyntaxHighlighter>
        </>
      </ClientOnly>
    </div>
  )
}
