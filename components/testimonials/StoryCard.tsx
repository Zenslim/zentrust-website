"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StoryCardProps {
  title: string
  author?: string
  date?: string
  location?: string
  excerpt: string
  image: string
  slug: string
  category?: string
  impact?: {
    metric_name: string
    metric_value: string | number
    metric_unit: string
  }
}

export function StoryCard({
  title,
  author,
  date,
  location,
  excerpt,
  image,
  slug,
  category,
  impact,
}: StoryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <div className="h-full flex flex-col transition-all duration-300">
        {/* Image */}
        <div className="relative h-64">
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                {category}
              </span>
            </div>
          )}

          {/* Impact Badge */}
          {impact && (
            <div className="absolute top-4 right-4">
              <div className="px-3 py-2 bg-black/30 text-white">
                <div className="text-sm font-bold text-primary">
                  {impact.metric_value} {impact.metric_unit}
                </div>
                <div className="text-xs text-muted-foreground">
                  {impact.metric_name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Meta Information */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            {author && (
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{author}</span>
              </div>
            )}
            {location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
            {date && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(date)}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground mb-6 line-clamp-3 flex-1">
            {excerpt}
          </p>

          {/* CTA */}
          <Button asChild variant="outline" className="w-full group/btn">
            <Link href={`/impact/stories/${slug}`}>
              Read Full Story
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.article>
  )
}

// Featured story component for hero sections
interface FeaturedStoryProps extends StoryCardProps {
  featured?: boolean
}

export function FeaturedStory({
  featured = true,
  ...props
}: FeaturedStoryProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative ${
        featured ? 'h-96 md:h-[500px]' : 'h-64'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={props.image}
          alt={props.title}
          fill
          className={`object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        {/* Category */}
        {props.category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-primary-foreground">
              {props.category}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`font-bold mb-4 text-white ${
            featured ? 'text-3xl md:text-4xl' : 'text-2xl'
          }`}
        >
          {props.title}
        </motion.h2>

        {/* Meta Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-6 text-white/80 text-sm mb-6"
        >
          {props.author && (
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{props.author}</span>
            </div>
          )}
          {props.date && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(props.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
          )}
          {props.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{props.location}</span>
            </div>
          )}
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/90 mb-6 line-clamp-3"
        >
          {props.excerpt}
        </motion.p>

        {/* Impact Badge */}
        {props.impact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center px-4 py-2 text-white">
              <span className="text-lg font-bold">
                {props.impact.metric_value} {props.impact.metric_unit}
              </span>
              <span className="ml-2 text-white/80">
                {props.impact.metric_name}
              </span>
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button asChild className="group">
            <Link href={`/impact/stories/${props.slug}`}>
              Read Full Story
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}