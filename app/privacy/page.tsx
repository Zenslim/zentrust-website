'use client'

import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, Users, Database, Globe, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { GlobalHero } from '@/components/hero/GlobalHero'

const dataCategories = [
  {
    icon: Users,
    title: 'Personal Information',
    description: 'Name, email address, phone number, mailing address, and organization affiliation.',
    usage: ['Processing donations', 'Sending newsletters', 'Communication', 'Event registration']
  },
  {
    icon: Database,
    title: 'Donation Information',
    description: 'Donation history, payment information, tax documentation, and communication preferences.',
    usage: ['Tax receipts', 'Donor recognition', 'Impact reporting', 'Compliance documentation']
  },
  {
    icon: Eye,
    title: 'Website Analytics',
    description: 'Pages visited, time spent on site, referral sources, and device information for improvement.',
    usage: ['Website optimization', 'Content improvement', 'Security monitoring', 'Performance analysis']
  },
  {
    icon: Globe,
    title: 'Communication Data',
    description: 'Email interactions, inquiry forms, survey responses, and feedback submissions.',
    usage: ['Customer service', 'Program development', 'Quality improvement', 'Relationship building']
  }
]

const securityMeasures = [
  {
    title: 'Encryption',
    description: 'All data transmitted and stored using industry-standard encryption protocols.'
  },
  {
    title: 'Access Controls',
    description: 'Strict access controls ensure only authorized personnel can access personal information.'
  },
  {
    title: 'Regular Audits',
    description: 'Periodic security audits and assessments to identify and address potential vulnerabilities.'
  },
  {
    title: 'Data Minimization',
    description: 'We collect only the information necessary for stated purposes and delete data when no longer needed.'
  }
]

const userRights = [
  {
    title: 'Access',
    description: 'Request a copy of all personal information we hold about you.',
    timeframe: 'Within 30 days'
  },
  {
    title: 'Correction',
    description: 'Update or correct any inaccurate or incomplete personal information.',
    timeframe: 'Within 30 days'
  },
  {
    title: 'Deletion',
    description: 'Request deletion of your personal information, subject to legal retention requirements.',
    timeframe: 'Within 30 days'
  },
  {
    title: 'Portability',
    description: 'Receive your personal information in a structured, machine-readable format.',
    timeframe: 'Within 30 days'
  },
  {
    title: 'Opt-out',
    description: 'Unsubscribe from communications or withdraw consent for data processing.',
    timeframe: 'Immediate'
  },
  {
    title: 'Restriction',
    description: 'Limit how we process your personal information in certain circumstances.',
    timeframe: 'Within 30 days'
  }
]

const thirdParties = [
  {
    service: 'Payment Processing',
    provider: 'Stripe',
    purpose: 'Secure donation processing',
    dataShared: 'Payment information, billing address'
  },
  {
    service: 'Email Marketing',
    provider: 'Mailchimp',
    purpose: 'Newsletter distribution and donor communications',
    dataShared: 'Email addresses, name, engagement metrics'
  },
  {
    service: 'Website Analytics',
    provider: 'Google Analytics',
    purpose: 'Website performance and user experience analysis',
    dataShared: 'Page views, session duration, device information'
  },
  {
    service: 'Cloud Storage',
    provider: 'Google Workspace',
    purpose: 'Secure data storage and internal communications',
    dataShared: 'Documents, contact information, project data'
  }
]

export default function PrivacyPage() {
  const contentId = "content"

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="Privacy"
        headline="Privacy Policy: how we collect, use, and safeguard data."
        dek="We protect your information with the same care we bring to regenerating ecosystems. The specifics are below."
        belowAnchorId={contentId}
        mode="confirm"
      />

      {/* Data Collection */}
      <section id={contentId} className="py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Information We <span className="gradient-text">Collect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We collect only the information necessary to fulfill our mission and provide 
              you with the best possible experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {dataCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <div key={index} className="glass-card rounded-2xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">How We Use It:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {category.usage.map((use, useIndex) => (
                        <li key={useIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                How We Use Your <span className="gradient-text">Information</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every piece of information we collect serves a specific purpose in advancing 
                our mission of regenerative agriculture and community impact.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Mission-Related Activities</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Processing donations and providing tax receipts</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Sending newsletters and program updates</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Facilitating research partnerships and collaborations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Organizing events, workshops, and community gatherings</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Responding to inquiries and providing customer service</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Organizational Improvement</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Analyzing website usage to improve user experience</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Understanding donor preferences to better serve our community</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Measuring program effectiveness and impact</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Ensuring security and preventing fraud</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Legal Basis for Processing</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Consent</h4>
                    <p className="text-sm text-muted-foreground">Newsletter subscriptions and optional communications</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Contract</h4>
                    <p className="text-sm text-muted-foreground">Donation processing and service provision</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Legitimate Interest</h4>
                    <p className="text-sm text-muted-foreground">Website analytics and security monitoring</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-1">Legal Obligation</h4>
                    <p className="text-sm text-muted-foreground">Tax reporting and nonprofit compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sharing */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Information <span className="gradient-text">Sharing</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We do not sell, rent, or share your personal information with third parties 
              for their own marketing purposes. Information is shared only when necessary 
              to provide services or comply with legal requirements.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                Service Providers
              </h3>
              <div className="space-y-4">
                {thirdParties.map((party, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-foreground">{party.service}</h4>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                        {party.provider}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{party.purpose}</p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Data shared:</strong> {party.dataShared}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-sm text-red-800 dark:text-red-200 text-center">
                <strong>We Never:</strong> Sell your personal information • Share data for marketing • 
                Use information for purposes not disclosed • Access your data without authorization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Security <span className="gradient-text">Measures</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We implement comprehensive security measures to protect your personal information 
              from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityMeasures.map((measure, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {measure.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {measure.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                Additional Security Practices
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Technical Safeguards</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Regular software updates and security patches</li>
                    <li>• Multi-factor authentication for staff access</li>
                    <li>• Secure backup and disaster recovery systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Organizational Measures</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Staff training on data protection practices</li>
                    <li>• Clear data handling policies and procedures</li>
                    <li>• Regular privacy impact assessments</li>
                    <li>• Incident response and breach notification protocols</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your <span className="gradient-text">Rights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              You have comprehensive rights regarding your personal information. 
              We're committed to helping you exercise these rights promptly and effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {userRights.map((right, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Right to {right.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {right.description}
                </p>
                <div className="bg-primary/10 rounded-lg p-2">
                  <p className="text-xs text-primary">
                    <strong>Response Time:</strong> {right.timeframe}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Exercise Your Rights
              </h3>
              <p className="text-muted-foreground mb-6">
                To exercise any of these rights or if you have questions about your data, 
                contact us using the information below.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>privacy@zentrust.org</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (508) 317-7517</span>
                </div>
                <Button asChild>
                  <Link href="/contact">
                    Contact Privacy Team
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Cookies & <span className="gradient-text">Tracking</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We use cookies and similar technologies to improve your website experience 
                and understand how our site is used.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">Types of Cookies We Use</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Required for basic website functionality including navigation and security.
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-2">
                    <p className="text-xs text-green-800 dark:text-green-200">
                      <strong>Always Active:</strong> These cookies are necessary for the website to function and cannot be disabled.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <strong>Opt-out Available:</strong> You can disable these through your browser settings.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Functional Cookies</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Remember your preferences and provide enhanced functionality.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-2">
                    <p className="text-xs text-blue-800 dark:text-blue-200">
                      <strong>User Choice:</strong> These enhance your experience but are not essential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Updates */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Policy <span className="gradient-text">Updates</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              This privacy policy may be updated to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes via email or website notice.
            </p>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Last Updated
              </h3>
              <p className="text-muted-foreground mb-6">
                This privacy policy was last updated on July 1, 2025, when ZenTrust received 
                501(c)(3) status and began operations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    Questions About Privacy
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/terms">
                    View Terms of Service
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
