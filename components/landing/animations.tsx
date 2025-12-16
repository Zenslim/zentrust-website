"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, Variants, useInView, useScroll, useTransform, animate } from 'framer-motion'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type FadeInProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type SlideInProps = FadeInProps & {
  direction?: 'left' | 'right' | 'up' | 'down'
}

export function SlideIn({ children, delay = 0, direction = 'up', className }: SlideInProps) {
  const offsets: Record<NonNullable<SlideInProps['direction']>, number[]> = {
    up: [0, 28],
    down: [0, -28],
    left: [28, 0],
    right: [-28, 0],
  }
  const [x, y] = direction === 'up' || direction === 'down'
    ? [0, offsets[direction][1]]
    : offsets[direction]

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
      transition={{ duration: 0.75, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: React.ReactNode
  stagger?: number
  delay?: number
  className?: string
}

export function Stagger({ children, stagger = 0.12, delay = 0, className }: StaggerProps) {
  const variants: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }),
    [stagger, delay]
  )

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type FloatingOrbProps = {
  size?: number
  color?: string
  blur?: number
  className?: string
  duration?: number
  offset?: number
}

export function FloatingOrb({
  size = 360,
  color = 'rgba(16, 185, 129, 0.18)',
  blur = 120,
  duration = 18,
  offset = 0,
  className,
}: FloatingOrbProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full mix-blend-screen',
        className
      )}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
      }}
      animate={{
        x: [0, 24, -18, 0],
        y: [0, -18, 22, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: offset,
      }}
    />
  )
}

type CounterProps = {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}

export function Counter({ value, suffix = '', prefix = '', className, duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}

type HoverMotionProps = {
  children: React.ReactNode
  className?: string
}

export function HoverLift({ children, className }: HoverMotionProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02, rotate: 0.6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type ButtonMotionProps = ButtonProps & {
  href?: string
  pulse?: boolean
}

export function MotionButton({ children, className, href, pulse = false, ...buttonProps }: ButtonMotionProps) {
  const motionProps = {
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.98 },
    animate: pulse ? { scale: [1, 1.03, 1] } : undefined,
    transition: pulse
      ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
      : { type: 'spring', stiffness: 420, damping: 24 },
  }

  if (href) {
    return (
      <motion.div {...motionProps}>
        <Button asChild className={className} {...buttonProps}>
          <Link href={href}>{children}</Link>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div {...motionProps}>
      <Button className={className} {...buttonProps}>
        {children}
      </Button>
    </motion.div>
  )
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type ParallaxTextProps = {
  children: React.ReactNode
  offset?: number
  className?: string
}

export function ParallaxText({ children, offset = 20, className }: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type GradientBorderProps = {
  children: React.ReactNode
  className?: string
}

export function GradientBorderCard({ children, className }: GradientBorderProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl shadow-[0_40px_120px_-60px_rgba(16,185,129,0.45)] dark:border-white/10 dark:bg-white/5',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export { motion, AnimatePresence }
