"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FadeIn, HoverLift, Stagger, StaggerItem } from './animations'
import type { BlogPost } from '@/lib/blog'

type Props = {
  posts: BlogPost[]
}

export function BlogPreviewClient({ posts }: Props) {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 pb-12">
          <FadeIn className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Latest insights
          </FadeIn>
          <FadeIn className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Stories from the frontlines of regeneration.
          </FadeIn>
          <FadeIn className="max-w-3xl text-lg text-muted-foreground">
            Field notes, research drops, and community stories sourced directly from our programs and partners.
          </FadeIn>
        </div>

        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 && (
            <FadeIn className="col-span-full rounded-3xl border border-border bg-card p-8 text-muted-foreground">
              New stories will appear here soon. Stay tuned for the latest research and program milestones.
            </FadeIn>
          )}

          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <HoverLift>
                <article className="overflow-hidden rounded-3xl border border-border bg-card backdrop-blur">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.div
                      className="h-full w-full"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.03, rotate: 0.5 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <Image
                        src={post.heroImage || '/images/default.jpg'}
                        alt={post.title}
                        width={1600}
                        height={900}
                        sizes="100vw"
                        className="object-cover w-full h-auto rounded-xl"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-slate-950/80" />
                    <div className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {post.category ?? 'Impact'}
                    </div>
                  </div>
                  <div className="space-y-3 p-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {post.date ? new Date(post.date).toLocaleDateString() : 'Fresh drop'}
                    </p>
                    <h3 className="text-xl font-semibold text-foreground">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      Read the story <ArrowRight className="inline-block w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </article>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
