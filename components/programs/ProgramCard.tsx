"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Users, TreePine, BookOpen, Microscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProgramCardProps {
  title: string
  short_description: string
  description?: string
  icon?: string
  hero_image?: string
  category?: string
  impact?: {
    metric_name: string
    metric_value: string | number
    metric_unit: string
  }
  slug: string
}

const iconMap = {
  'education': BookOpen,
  'research': Microscope,
  'community': Users,
  'conservation': TreePine,
  'default': TreePine,
}

const categoryColors = {
  'Education': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  'Research': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
  'Community': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  'Conservation': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300',
}

export function ProgramCard({
  title,
  short_description,
  description,
  icon = 'default',
  hero_image,
  category,
  impact,
  slug,
}: ProgramCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || iconMap.default
  const categoryColor = category ? categoryColors[category as keyof typeof categoryColors] : ''

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <div className="h-full flex flex-col gap-6">
        {/* Header with Icon and Category */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 flex items-center justify-center">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Category Badge */}
            {category && (
              <div className="flex-shrink-0">
                <span className={cn(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  categoryColor
                )}>
                  {category}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Short Description */}
          <p className="text-muted-foreground line-clamp-3">
            {short_description}
          </p>
        </div>

        {/* Impact Metrics */}
        {impact && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {impact.metric_value} {impact.metric_unit}
                </div>
                <div className="text-sm text-muted-foreground">
                  {impact.metric_name}
                </div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </div>
          </div>
        )}

        {/* Detailed Description (if provided) */}
        {description && (
          <div className="flex-1">
            <div className="text-sm text-muted-foreground line-clamp-4">
              {description}
            </div>
          </div>
        )}

        {/* Footer with CTA */}
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <Button asChild variant="outline" size="sm" className="group/btn">
              <Link href={`/programs/${slug}`}>
                Learn More
                <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>Community Program</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// Featured program component for hero sections
interface FeaturedProgramProps extends ProgramCardProps {
  featured?: boolean
}

export function FeaturedProgram({
  featured = true,
  ...props
}: FeaturedProgramProps) {
  const IconComponent = iconMap[props.icon as keyof typeof iconMap] || iconMap.default
  const categoryColor = props.category ? categoryColors[props.category as keyof typeof categoryColors] : ''

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative p-8"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          {/* Icon */}
          <div className="w-16 h-16 flex items-center justify-center">
            <IconComponent className="h-8 w-8 text-primary" />
          </div>

          {/* Category Badge */}
          {props.category && (
            <span className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
              categoryColor
            )}>
              {props.category}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {props.title}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6 text-lg">
          {props.short_description}
        </p>

        {/* Impact Metrics */}
        {props.impact && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">
                  {props.impact.metric_value} {props.impact.metric_unit}
                </div>
                <div className="text-foreground/80">
                  {props.impact.metric_name}
                </div>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between">
          <Button asChild size="lg" className="group">
            <Link href={`/programs/${props.slug}`}>
              Explore Program
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <div className="text-sm text-muted-foreground">
            Featured Program
          </div>
        </div>
      </div>
    </motion.div>
  )
}