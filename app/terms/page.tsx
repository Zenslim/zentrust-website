'use client'

import { Button } from '@/components/ui/button'
import { Scale, Shield, FileText, Globe, Users, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { UniversalHero } from '@/components/hero/UniversalHero'
import type { HeroDefinition } from '@/components/hero/createHero'

const keyTerms = [
  {
    icon: Scale,
    title: 'Acceptance of Terms',
    description: 'By accessing and using ZenTrust\'s website and services, you agree to be bound by these terms and conditions.'
  },
  {
    icon: Shield,
    title: 'User Responsibilities',
    description: 'Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.'
  },
  {
    icon: FileText,
    title: 'Intellectual Property',
    description: 'ZenTrust content is protected by copyright and other intellectual property laws. Limited license granted for personal use.'
  },
  {
    icon: Users,
    title: 'Nonprofit Disclaimer',
    description: 'ZenTrust operates as a 501(c)(3) public charity. All services are provided for educational and charitable purposes.'
  }
]

const prohibitedActivities = [
  'Using the website for any unlawful purpose or to encourage unlawful activities',
  'Attempting to gain unauthorized access to any portion of the website',
  'Interfering with or disrupting the website or servers',
  'Transmitting viruses, malware, or other malicious code',
  'Impersonating any person or entity, or falsely stating affiliation',
  'Collecting user information without consent',
  'Using automated systems to access the website without permission',
  'Reproducing, distributing, or creating derivative works without authorization'
]

const liabilityLimitations = [
  {
    title: 'Service Availability',
    description: 'We strive to maintain website availability but cannot guarantee uninterrupted access.'
  },
  {
    title: 'Content Accuracy',
    description: 'While we aim for accuracy, we cannot guarantee that all information is error-free or current.'
  },
  {
    title: 'External Links',
    description: 'We are not responsible for the content or practices of third-party websites linked from our site.'
  },
  {
    title: 'Donation Security',
    description: 'While we use industry-standard security measures, we cannot guarantee absolute security of online transactions.'
  }
]

export default function TermsPage() {
  const hero: HeroDefinition = {
    identity: "ZenTrust Terms",
    headlineLines: ["Terms of Service"],
    orientation: [
      "These terms guide how you interact with ZenTrust online and describe our commitment to transparent operations.",
      "Clear expectations build trust and protect the community we serve.",
    ],
  }

  return (
    <div className="min-h-screen">
      <UniversalHero hero={hero} />

      {/* Key Terms Overview */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Key <span className="gradient-text">Terms</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These fundamental terms outline the core agreement between you and ZenTrust 
              when using our website and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {keyTerms.map((term, index) => {
              const Icon = term.icon
              return (
                <div key={index} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {term.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {term.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Acceptance and Scope */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Acceptance & <span className="gradient-text">Scope</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These terms apply to all users of ZenTrust's website, services, and digital platforms.
              </p>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Agreement to Terms</h3>
                <p className="text-muted-foreground mb-4">
                  By accessing, browsing, or using the ZenTrust website (located at zentrust.org), 
                  you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <p className="text-muted-foreground mb-4">
                  If you do not agree to these terms, please do not use our website or services. 
                  Your continued use of the website constitutes acceptance of these terms and any modifications.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Effective Date:</strong> These terms are effective as of July 1, 2025, 
                    when ZenTrust received 501(c)(3) status and began operations.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Scope of Services</h3>
                <p className="text-muted-foreground mb-4">
                  ZenTrust provides educational content, research publications, program information, 
                  donation processing, and community engagement platforms related to regenerative agriculture 
                  and ecological restoration.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Included Services</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Website browsing and content access</li>
                      <li>• Newsletter subscription and communications</li>
                      <li>• Donation processing and receipts</li>
                      <li>• Program information and updates</li>
                      <li>• Research publications and resources</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Service Availability</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Subject to maintenance and updates</li>
                      <li>• May be modified or discontinued with notice</li>
                      <li>• Not guaranteed to be error-free<li>• Provided</li>
                       "as is" without warranties</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Responsibilities */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                User <span className="gradient-text">Responsibilities</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Users are expected to use ZenTrust's website responsibly and in accordance 
                with these terms and applicable laws.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Acceptable Use</h3>
                <div className="space-y-4">
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-semibold text-foreground mb-3">Lawful Purposes</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the website only for lawful purposes and in a way that does not infringe 
                      upon the rights of others or restrict their use of the website.
                    </p>
                  </div>
                  
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-semibold text-foreground mb-3">Account Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Maintain the confidentiality of any account credentials and promptly notify 
                      us of any unauthorized use of your account.
                    </p>
                  </div>
                  
                  <div className="glass-card rounded-2xl p-6">
                    <h4 className="font-semibold text-foreground mb-3">Accurate Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide accurate and truthful information when creating accounts, 
                      making donations, or contacting us.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Prohibited Activities</h3>
                <div className="space-y-3">
                  {prohibitedActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{activity}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-200">
                    <strong>Consequences:</strong> Violation of these terms may result in immediate 
                    termination of access and potential legal action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intellectual Property */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Intellectual <span className="gradient-text">Property</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                ZenTrust owns or licenses all content on this website. We grant limited 
                permission for personal, non-commercial use.
              </p>
            </div>

            <div className="space-y-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Our Content</h3>
                <p className="text-muted-foreground mb-4">
                  All content on the ZenTrust website, including text, graphics, logos, images, 
                  audio clips, digital downloads, data compilations, and software, is the property 
                  of ZenTrust or its content suppliers and is protected by copyright and other 
                  intellectual property laws.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Protected Materials</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Website design and layout</li>
                      <li>• Written content and publications</li>
                      <li>• Research findings and data</li>
                      <li>• Educational materials and curricula</li>
                      <li>• Brand elements and logos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Permitted Uses</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Personal, non-commercial browsing</li>
                      <li>• Sharing links to our content</li>
                      <li>• Limited quoting with attribution</li>
                      <li>• Educational use with proper credit</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">User Content</h3>
                <p className="text-muted-foreground mb-4">
                  By submitting content to ZenTrust (such as comments, feedback, or materials), 
                  you grant us a non-exclusive, royalty-free, perpetual, and worldwide license 
                  to use, modify, and distribute that content for our charitable and educational purposes.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Your Rights:</strong> You retain ownership of your content but grant 
                    ZenTrust permission to use it in support of our mission. We will not sell 
                    user content to third parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nonprofit Disclaimer */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Nonprofit <span className="gradient-text">Disclaimer</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ZenTrust operates as a 501(c)(3) public charity with specific legal obligations 
              and limitations on its activities.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Charitable Purpose</h3>
                <p className="text-muted-foreground mb-4">
                  ZenTrust is organized and operated exclusively for charitable, educational, 
                  and scientific purposes within the meaning of Section 501(c)(3) of the Internal Revenue Code.
                </p>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    <strong>EIN:</strong> 33-4318487<br />
                    <strong>Status:</strong> 501(c)(3) Public Charity
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">No Professional Advice</h3>
                <p className="text-muted-foreground mb-4">
                  Information provided on this website is for educational and informational purposes only 
                  and does not constitute professional, legal, tax, or financial advice.
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Consult Professionals:</strong> Always consult qualified professionals 
                    for advice specific to your situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Liability Limitations */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Liability <span className="gradient-text">Limitations</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                ZenTrust's liability is limited as permitted by law. We encourage responsible 
                use of our website and services.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {liabilityLimitations.map((limitation, index) => (
                <div key={index} className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {limitation.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {limitation.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                Limitation of Liability
              </h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, ZENTRUST SHALL NOT BE LIABLE FOR ANY 
                  INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS 
                  OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS 
                  OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
                </p>
                <ul className="space-y-2 ml-6">
                  <li>• Your access to or use of or inability to access or use the website</li>
                  <li>• Any conduct or content of any third party on the website</li>
                  <li>• Any content obtained from the website</li>
                  <li>• Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>
                <p>
                  IN NO EVENT SHALL ZENTRUST'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, 
                  AND CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID ZENTRUST IN THE LAST 
                  TWELVE (12) MONTHS, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Governing <span className="gradient-text">Law</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These terms are governed by the laws of the Commonwealth of Massachusetts, 
                United States, where ZenTrust is incorporated.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Jurisdiction</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  These terms and your use of the ZenTrust website shall be governed by and 
                  construed in accordance with the laws of the Commonwealth of Massachusetts, 
                  without regard to its conflict of law provisions.
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-foreground">
                    <strong>Venue:</strong> Any legal action or proceeding shall be brought 
                    in the courts of Plymouth County, Massachusetts.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Scale className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Resolution</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  We encourage resolution of disputes through direct communication. 
                  However, if formal resolution is necessary, binding arbitration may be used 
                  in accordance with Massachusetts law.
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-foreground">
                    <strong>First Step:</strong> Contact us directly at hello@zentrust.org 
                    to resolve concerns informally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modifications and Contact */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Modifications & <span className="gradient-text">Contact</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                These terms may be updated to reflect changes in our practices or legal requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Terms Updates</h3>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these terms at any time. Material changes 
                  will be communicated via website notice and, where appropriate, email notification.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Continued Use:</strong> Your continued use of the website after 
                    any modifications constitutes acceptance of the updated terms.
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Questions About Terms</h3>
                <p className="text-muted-foreground mb-4">
                  If you have questions about these Terms of Service, please contact us using 
                  the information below.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>legal@zentrust.org</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <span>📍 2 Reserve Way, Duxbury, MA 02332</span>
                  </div>
                  <Button asChild className="w-full mt-4">
                    <Link href="/contact">
                      Contact Legal Team
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="glass-card rounded-2xl p-6">
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> July 1, 2025<br />
                  <strong>Effective Date:</strong> July 1, 2025<br />
                  <strong>Version:</strong> 1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
