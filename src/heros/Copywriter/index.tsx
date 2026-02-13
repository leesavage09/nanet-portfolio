'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const CopywriterHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  })

  return (
    <div
      className="relative -mt-16 mx-4 md:mx-16 flex items-center justify-center"
      data-theme="light"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="text-center text-sm not-prose font-bold">
          <span className="mb-6 text-smalt-blue-500 mx-4 sm:mx-7 text-6xl sm:text-7xl inline-block">
            Hi there,
          </span>
          <span className="mb-6 text-smalt-blue-500 text-6xl sm:text-7xl inline-block">
            I'm Nanet
          </span>
          <span className="mb-6 text-smalt-blue-500 text-3xl sm:text-5xl inline-block w-full">
            Not just another copywriter
          </span>
          {/* {richText && (
            <RichText
              className="mb-6 text-smalt-blue-500 not-prose font-bold text-2xl md:text-7xl"
              data={richText}
              enableGutter={false}
            />
          )} */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
