// components/testimonials/StoriesSection.tsx

import { FeaturedStory } from './StoryCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const featuredStories = [
  {
    title: 'From Desert to Oasis: The Story of Riverside Community Farm',
    author: 'Maria Rodriguez',
    date: '2024-11-15',
    location: 'Riverside Valley',
    excerpt:
      'How a community transformed barren land into a thriving sustainable farm using regenerative agriculture practices.',
    image: '/images/hero/sustainable-farm.jpg',
    slug: 'riverside-community-farm',
    category: 'Success Story',
    impact: {
      metric_name: 'Land Restored',
      metric_value: '500',
      metric_unit: 'acres',
    },
  },
  {
    title: 'Youth Education Program: Growing Future Environmental Leaders',
    author: 'Dr. Sarah Chen',
    date: '2024-10-28',
    location: 'Green Valley High School',
    excerpt:
      'Our youth education program inspires the next generation of environmental stewards through hands-on learning.',
    image: '/images/programs/education-program.jpg',
    slug: 'youth-education-program',
    category: 'Education',
    impact: {
      metric_name: 'Students Reached',
      metric_value: '2,500',
      metric_unit: 'students',
    },
  },
]

export function StoriesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories of transformation and hope from communities we've had the 
            privilege to work alongside in our mission for a sustainable future.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {featuredStories.map((story, index) => (
            <FeaturedStory key={index} {...story} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/impact#stories">
              Read More Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
