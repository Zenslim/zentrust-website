'use client'

import { Button } from '@/components/ui/button'
import { Users, Microscope, Building, Heart, Target, Award, Globe, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { GlobalHero } from '@/components/hero/GlobalHero'

const partnershipTypes = [
  {
    icon: BookOpen,
    title: 'Academic Partnerships',
    description: 'Collaborative research initiatives with universities and research institutions focused on regenerative agriculture and ecological restoration.',
    benefits: [
      'Joint research publications and funding opportunities',
      'Access to ZenTrust field sites and data',
      'Student internship and thesis opportunities',
      'Shared resources and expertise'
    ],
    status: 'Partnership development in progress'
  },
  {
    icon: Users,
    title: 'Community Implementation',
    description: 'Direct collaboration with farming communities, local organizations, and regional partners to implement regenerative practices.',
    benefits: [
      'Local capacity building and training programs',
      'Community-led project design and implementation',
      'Sustainable livelihood improvements',
      'Regional knowledge sharing networks'
    ],
    status: 'Pilot partnerships launching 2025'
  },
  {
    icon: Building,
    title: 'Corporate Impact',
    description: 'Strategic partnerships with companies committed to environmental stewardship and sustainable supply chain development.',
    benefits: [
      'Supply chain sustainability initiatives',
      'Employee engagement and volunteer programs',
      'Impact measurement and reporting',
      'Brand alignment with regenerative values'
    ],
    status: 'Expression of interest welcome'
  },
  {
    icon: Globe,
    title: 'International Collaboration',
    description: 'Global partnerships to scale regenerative agriculture practices and support knowledge transfer across regions.',
    benefits: [
      'Cross-cultural learning and exchange',
      'International research consortium participation',
      'Global grant funding opportunities',
      'Worldwide impact measurement'
    ],
    status: 'Building international network'
  }
]

const partnershipPrinciples = [
  {
    icon: Target,
    title: 'Mission Alignment',
    description: 'Partnerships must directly support ZenTrust\'s core mission of advancing regenerative agriculture and ecological restoration.'
  },
  {
    icon: Award,
    title: 'Scientific Rigor',
    description: 'All collaborative work maintains high scientific standards with peer review and open access to findings.'
  },
  {
    icon: Heart,
    title: 'Ethical Framework',
    description: 'Partnerships operate under clear ethical guidelines ensuring benefit to all stakeholders and communities.'
  },
  {
    icon: Users,
    title: 'Shared Value',
    description: 'Successful partnerships create mutual benefit while advancing collective impact beyond what any organization could achieve alone.'
  }
]

const partnershipProcess = [
  {
    step: '1',
    title: 'Initial Contact',
    description: 'Submit partnership inquiry through our contact form or direct email to partnerships@zentrust.org'
  },
  {
    step: '2',
    title: 'Alignment Assessment',
    description: 'We evaluate mission alignment, mutual benefit potential, and partnership feasibility'
  },
  {
    step: '3',
    title: 'Proposal Development',
    description: 'Collaborative development of partnership framework, objectives, and success metrics'
  },
  {
    step: '4',
    title: 'Agreement & Launch',
    description: 'Formal partnership agreement execution and program implementation launch'
  }
]

const currentOpportunities = [
  {
    title: 'Regenerative Agriculture Research Consortium',
    description: 'Join universities and research institutions in establishing standardized methodologies for measuring regenerative outcomes.',
    timeline: 'Q1 2025',
    commitment: '2-3 year commitment'
  },
  {
    title: 'Community-Based Pilot Program',
    description: 'Partner with farming communities to establish demonstration sites for regenerative practices.',
    timeline: 'Q2 2025',
    commitment: '3-5 year commitment'
  },
  {
    title: 'Corporate Supply Chain Initiative',
    description: 'Collaborate with companies to develop regenerative sourcing standards and implementation frameworks.',
    timeline: 'Q3 2025',
    commitment: '1-2 year commitment'
  },
  {
    title: 'International Knowledge Exchange',
    description: 'Participate in global network for sharing regenerative agriculture practices across different climatic regions.',
    timeline: 'Q4 2025',
    commitment: 'Ongoing collaboration'
  }
]

export default function PartnerPage() {
  const contentId = "content"

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="ZenTrust Partnerships"
        headline="Partnerships are deliberate, accountable, and rooted in shared outcomes."
        dek="We collaborate with institutions and communities to scale regenerative agriculture and ecological restoration. The partnership map is below."
        belowAnchorId={contentId}
        mode="confirm"
      />

      {/* Partnership Principles */}
      <section id={contentId} className="py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Partnership <span className="gradient-text">Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our partnership framework is built on proven collaboration principles 
              that ensure mutual benefit and maximum impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipPrinciples.map((principle, index) => {
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
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Partnership <span className="gradient-text">Types</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ZenTrust engages in multiple partnership models tailored to different 
              organizational needs and collaboration objectives.
            </p>
          </div>

          <div className="space-y-8">
            {partnershipTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <div key={index} className="glass-card rounded-2xl p-8">
                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">
                          {type.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {type.description}
                      </p>
                      <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <p className="text-xs text-amber-800 dark:text-amber-200">
                          <strong>Status:</strong> {type.status}
                        </p>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-foreground mb-4">Partnership Benefits</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {type.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Partnership <span className="gradient-text">Process</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our structured approach ensures successful partnerships through clear 
                communication, mutual understanding, and collaborative design.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partnershipProcess.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Ready to Explore Partnership?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Contact our partnership team to begin the conversation about how 
                  we can work together to advance regenerative agriculture.
                </p>
                <div className="space-y-4">
                  <Button asChild>
                    <Link href="/contact">
                      partnerships@zentrust.org
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Or call us at +1 (508) 317-7517
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Current <span className="gradient-text">Opportunities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These partnership opportunities are actively seeking collaborators 
              to launch in 2025 and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {currentOpportunities.map((opportunity, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {opportunity.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {opportunity.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {opportunity.timeline}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {opportunity.commitment}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              Don't see an opportunity that fits? We're always open to exploring 
              new partnership possibilities that align with our mission.
            </p>
            <Button variant="outline" asChild>
              <Link href="/contact">
                Propose Custom Partnership
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Scientific Collaboration Standards */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Scientific Collaboration <span className="gradient-text">Standards</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              All ZenTrust partnerships maintain rigorous scientific standards 
              to ensure credibility and maximum impact.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="glass-card rounded-2xl p-6 text-center">
                <Microscope className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Open Science</h3>
                <p className="text-sm text-muted-foreground">
                  All research findings published openly with data sharing protocols
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Peer Review</h3>
                <p className="text-sm text-muted-foreground">
                  Independent review process ensures scientific rigor and quality
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6 text-center">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-3">Impact Measurement</h3>
                <p className="text-sm text-muted-foreground">
                  Standardized metrics for measuring ecological and social outcomes
                </p>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Partnership Success Framework
              </h3>
              <p className="text-muted-foreground mb-6">
                We measure partnership success through multiple indicators:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Quantitative Metrics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Research publications and citations</li>
                    <li>• Geographic reach and scale</li>
                    <li>• Community participants engaged</li>
                    <li>• Funding secured and leveraged</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Qualitative Indicators</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Knowledge transfer effectiveness</li>
                    <li>• Community capacity building</li>
                    <li>• Policy influence and adoption</li>
                    <li>• Long-term sustainability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to <span className="gradient-text">Partner</span> With Us?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join us in building a regenerative future through collaborative 
              research, community implementation, and shared impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Partnership Conversation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/programs">
                  Learn About Our Programs
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              partnerships@zentrust.org • +1 (508) 317-7517
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
