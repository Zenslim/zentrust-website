'use client'

import { Button } from '@/components/ui/button'
import { Eye, Users, CheckCircle, Phone, Mail, Target, Clock, Globe } from 'lucide-react'
import Link from 'next/link'
import { GlobalHero } from '@/components/hero/GlobalHero'

const accessibilityPrinciples = [
  {
    icon: Eye,
    title: 'Perceivable',
    description: 'Information and interface components must be presentable in ways users can perceive, regardless of their abilities.'
  },
  {
    icon: Users,
    title: 'Operable',
    description: 'Interface components and navigation must be operable by all users through various input methods.'
  },
  {
    icon: Target,
    title: 'Understandable',
    description: 'Information and the operation of user interfaces must be understandable to all users.'
  },
  {
    icon: Globe,
    title: 'Robust',
    description: 'Content must be robust enough to work with current and future assistive technologies.'
  }
]

const currentFeatures = [
  {
    title: 'Keyboard Navigation',
    status: 'Implemented',
    description: 'Full website navigation and functionality available using only keyboard input.'
  },
  {
    title: 'Screen Reader Compatibility',
    status: 'Implemented',
    description: 'Optimized for NVDA, JAWS, and VoiceOver screen readers with proper semantic markup.'
  },
  {
    title: 'Color Contrast',
    status: 'Implemented',
    description: 'All text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).'
  },
  {
    title: 'Alt Text',
    status: 'Implemented',
    description: 'All images include descriptive alternative text for screen reader users.'
  },
  {
    title: 'Focus Indicators',
    status: 'Implemented',
    description: 'Clear visual focus indicators for keyboard navigation throughout the site.'
  },
  {
    title: 'Responsive Design',
    status: 'Implemented',
    description: 'Website adapts to different screen sizes and zoom levels up to 200%.'
  }
]

const ongoingImprovements = [
  {
    title: 'ARIA Labels and Roles',
    status: 'In Progress',
    description: 'Enhanced ARIA implementation for complex interactive components.',
    timeline: 'Q4 2025'
  },
  {
    title: 'Video Accessibility',
    status: 'Planned',
    description: 'Closed captions and audio descriptions for all video content.',
    timeline: 'Q1 2026'
  },
  {
    title: 'Form Accessibility',
    status: 'In Progress',
    description: 'Enhanced form validation and error messaging for assistive technologies.',
    timeline: 'Q4 2025'
  },
  {
    title: 'Mobile Optimization',
    status: 'Planned',
    description: 'Improved touch target sizes and mobile-specific accessibility features.',
    timeline: 'Q1 2026'
  }
]

const accessibilityStandards = [
  {
    level: 'WCAG 2.1 AA',
    description: 'Web Content Accessibility Guidelines Level AA compliance',
    compliance: 'Current Target'
  },
  {
    level: 'Section 508',
    description: 'U.S. Federal accessibility standards for electronic and information technology',
    compliance: 'Assessment Planned'
  },
  {
    level: 'ADA Compliance',
    description: 'Americans with Disabilities Act website accessibility requirements',
    compliance: 'Aligned with WCAG'
  },
  {
    level: 'EN 301 549',
    description: 'European standard for accessibility requirements for ICT products and services',
    compliance: 'Future Consideration'
  }
]

export default function AccessibilityPage() {
  const contentId = "content"

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="ZenTrust Accessibility"
        headline="Accessibility keeps regenerative work open to everyone."
        dek="We commit to digital access for all people and continuously improve every surface of our site and services. Details sit directly below."
        belowAnchorId={contentId}
        mode="confirm"
        secondaryCta={{ label: "Review commitments", href: `#${contentId}` }}
      />

      {/* Commitment Statement */}
      <section id={contentId} className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Accessibility <span className="gradient-text">Commitment</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                As a newly formed nonprofit dedicated to building inclusive communities 
                and regenerative systems, accessibility is core to our mission and values.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Inclusion as a Core Value</h3>
              <p className="text-muted-foreground mb-6">
                ZenTrust believes that regenerative agriculture and ecological restoration 
                must include all communities and voices. Digital accessibility is essential 
                to ensuring equal participation in our mission, programs, and community.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Our Commitment</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Provide accessible digital experiences for all users</li>
                    <li>• Continuously improve accessibility standards</li>
                    <li>• Include accessibility in all web development</li>
                    <li>• Train staff on accessibility best practices</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Legal Compliance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Target WCAG 2.1 Level AA compliance</li>
                    <li>• Align with ADA requirements</li>
                    <li>• Follow Section 508 guidelines</li>
                    <li>• Regular accessibility audits and testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Community Impact
                </h3>
                <p className="text-muted-foreground">
                  Accessible digital platforms enable broader participation in regenerative 
                  agriculture education, research sharing, and community building.
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Continuous Improvement
                </h3>
                <p className="text-muted-foreground">
                  We view accessibility as an ongoing journey, not a destination, 
                  continuously improving based on user feedback and evolving standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WCAG 2.1 AA Standards */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              WCAG 2.1 AA <span className="gradient-text">Compliance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our website aims to meet Web Content Accessibility Guidelines (WCAG) 2.1 
              Level AA standards, the international benchmark for web accessibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {accessibilityPrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <div key={index} className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {principle.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                Accessibility Standards Framework
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {accessibilityStandards.map((standard, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{standard.level}</h4>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        {standard.compliance}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{standard.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Accessibility Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Current <span className="gradient-text">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our website currently includes these accessibility features to support 
              diverse user needs and assistive technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentFeatures.map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {feature.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600 font-medium">
                      {feature.status}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                Browser and Technology Support
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Screen Readers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• NVDA (Windows)</li>
                    <li>• JAWS (Windows)</li>
                    <li>• VoiceOver (Mac/iOS)</li>
                    <li>• TalkBack (Android)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Browsers</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Chrome (latest)</li>
                    <li>• Firefox (latest)</li>
                    <li>• Safari (latest)</li>
                    <li>• Edge (latest)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Assistive Tech</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Keyboard navigation</li>
                    <li>• Switch devices</li>
                    <li>• Voice recognition</li>
                    <li>• Magnification tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Improvements */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ongoing <span className="gradient-text">Improvements</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We continuously work to enhance accessibility features and address 
              emerging accessibility needs and technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ongoingImprovements.map((improvement, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">
                    {improvement.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-xs text-blue-600 font-medium">
                      {improvement.status}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">
                  {improvement.description}
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    <strong>Timeline:</strong> {improvement.timeline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                Quarterly Accessibility Reviews
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                We conduct comprehensive accessibility reviews every quarter to identify 
                areas for improvement and ensure ongoing compliance.
              </p>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Q4</div>
                  <div className="text-sm text-muted-foreground">2025</div>
                  <div className="text-xs text-muted-foreground">Initial audit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Q1</div>
                  <div className="text-sm text-muted-foreground">2026</div>
                  <div className="text-xs text-muted-foreground">Feature updates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Q2</div>
                  <div className="text-sm text-muted-foreground">2026</div>
                  <div className="text-xs text-muted-foreground">User testing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Q3</div>
                  <div className="text-sm text-muted-foreground">2026</div>
                  <div className="text-xs text-muted-foreground">Compliance review</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Report Accessibility Issues */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Report Accessibility <span className="gradient-text">Issues</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you encounter accessibility barriers on our website, we want to know 
              about them. Your feedback helps us improve accessibility for everyone.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card rounded-2xl p-6 text-center">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our accessibility team
                </p>
                <p className="text-primary font-semibold">+1 (508) 317-7517</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  Send detailed accessibility feedback
                </p>
                <p className="text-primary font-semibold">accessibility@zentrust.org</p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Contact Form</h3>
                <p className="text-muted-foreground mb-4">
                  Use our accessibility feedback form
                </p>
                <Button asChild size="sm">
                  <Link href="/contact">
                    Submit Feedback
                  </Link>
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                What to Include in Your Report
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Technical Details</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Page URL where the issue occurs</li>
                    <li>• Browser and version you're using</li>
                    <li>• Assistive technology (if applicable)</li>
                    <li>• Steps to reproduce the issue</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Issue Description</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• What you were trying to do</li>
                    <li>• What happened instead</li>
                    <li>• How the issue affected you</li>
                    <li>• Any suggestions for improvement</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/contact">
                  Report Accessibility Issue
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/newsletter">
                  Subscribe for Updates
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Response Commitment */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Response <span className="gradient-text">Commitment</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We are committed to promptly addressing accessibility issues and 
              keeping you informed about our progress.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">24 Hours</div>
                <div className="text-sm text-muted-foreground">Initial acknowledgment</div>
                <div className="text-xs text-muted-foreground mt-1">We confirm receipt of your report</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">5 Business Days</div>
                <div className="text-sm text-muted-foreground">Detailed response</div>
                <div className="text-xs text-muted-foreground mt-1">We provide investigation timeline</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-2">30 Days</div>
                <div className="text-sm text-muted-foreground">Resolution or status update</div>
                <div className="text-xs text-muted-foreground mt-1">We resolve or provide progress report</div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Alternative Formats Available
              </h3>
              <p className="text-muted-foreground mb-6">
                If you need this accessibility statement in an alternative format 
                (such as large print, audio, or Braille), please contact us and 
                we will provide it promptly.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-sm text-green-800 dark:text-green-200 text-center">
                  <strong>Commitment:</strong> We will work with you to find the best 
                  format to meet your accessibility needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
