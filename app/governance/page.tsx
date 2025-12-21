'use client'

import { Button } from '@/components/ui/button'
import { Shield, Scale, Users, FileText, Eye, Heart } from 'lucide-react'
import Link from 'next/link'
import { GlobalHero } from '@/components/hero/GlobalHero'

const governancePrinciples = [
  {
    icon: Shield,
    title: 'Nonprofit Compliance',
    description: 'Full adherence to IRS 501(c)(3) regulations, including prohibitions on private inurement and political campaign activities.'
  },
  {
    icon: Scale,
    title: 'Conflict of Interest',
    description: 'Comprehensive policies ensuring board members and staff maintain independence and avoid conflicts of interest in decision-making.'
  },
  {
    icon: Users,
    title: 'Board Responsibilities',
    description: 'Clear fiduciary duties including oversight of programs, finances, and compliance with all applicable laws and regulations.'
  },
  {
    icon: Eye,
    title: 'Transparency & Accountability',
    description: 'Annual Form 990 filings, public reporting of program outcomes, and open access to governance documents and policies.'
  },
  {
    icon: FileText,
    title: 'International Grantmaking',
    description: 'Strict oversight of grant programs including due diligence, monitoring, and evaluation to ensure compliance with IRS regulations.'
  },
  {
    icon: Heart,
    title: 'Ethical Stewardship',
    description: 'Commitment to transparent, ethical management of donor funds with all revenue reinvested in mission advancement.'
  }
]

const boardResponsibilities = [
  'Fiduciary oversight of organizational finances and assets',
  'Strategic planning and program approval',
  'Executive director hiring, evaluation, and oversight',
  'Compliance with IRS regulations and nonprofit law',
  'Risk management and internal controls',
  'Public accountability and transparency'
]

const policies = [
  {
    title: 'Conflict of Interest Policy',
    description: 'Establishes procedures for identifying, disclosing, and managing potential conflicts of interest among board members, officers, and key employees.',
    status: 'Adopted July 2025'
  },
  {
    title: 'Whistleblower Protection Policy',
    description: 'Protects employees and volunteers who report suspected violations of law, regulation, or organizational policy from retaliation.',
    status: 'Adopted July 2025'
  },
  {
    title: 'Document Retention Policy',
    description: 'Ensures proper retention and destruction of organizational records in compliance with legal requirements and best practices.',
    status: 'Adopted July 2025'
  },
  {
    title: 'Privacy Policy',
    description: 'Governs collection, use, and protection of personal information from donors, volunteers, and program participants.',
    status: 'Adopted July 2025'
  }
]

export default function GovernancePage() {
  const contentId = "content"

  return (
    <div className="min-h-screen">
      <GlobalHero
        kicker="ZenTrust Governance"
        headline="Governance and policies keep the organization accountable to public benefit."
        dek="Clear, ethical stewardship guides every action. The details sit directly below."
        belowAnchorId={contentId}
        mode="confirm"
      />

      {/* IRS Compliance Section */}
      <section id={contentId} className="py-24 scroll-mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                IRS 501(c)(3) <span className="gradient-text">Compliance</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                As a newly established 501(c)(3) public charity, ZenTrust maintains strict 
                adherence to all federal and state regulations governing nonprofit organizations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card rounded-2xl p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Public Charity Status</h3>
                <p className="text-muted-foreground mb-4">
                  ZenTrust qualified as a 501(c)(3) public charity effective July 1, 2025. 
                  Donations are tax-deductible to the full extent allowed by law.
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-foreground">
                    <strong>EIN:</strong> 33-4318487<br />
                    <strong>Classification:</strong> Public Charity under IRC 501(c)(3)
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Prohibited Activities</h3>
                <p className="text-muted-foreground mb-4">
                  We strictly avoid private inurement, political campaign activities, 
                  and excessive lobbying in accordance with IRS regulations.
                </p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm text-foreground">
                    <strong>No private benefit:</strong> All activities serve public charitable purposes<br />
                    <strong>Political neutrality:</strong> No candidate or party endorsement
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-4 text-center">
                  Transparency Commitments
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Annual Filings</h4>
                    <p className="text-sm text-muted-foreground">
                      Form 990 filed annually with complete financial disclosure and program activity reporting
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Public Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Governing documents, policies, and financial statements available upon request
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Audit Standards</h4>
                    <p className="text-sm text-muted-foreground">
                      Annual financial audit by independent CPA when threshold reached
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Principles */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Governance <span className="gradient-text">Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our governance framework is built on proven nonprofit best practices 
              adapted to ZenTrust's unique mission and operational stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {governancePrinciples.map((principle, index) => {
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

      {/* Board Responsibilities */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Board <span className="gradient-text">Responsibilities</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  The ZenTrust Board of Directors provides strategic oversight and ensures 
                  fiduciary responsibility while maintaining independence from management operations.
                </p>
                
                <div className="space-y-4">
                  {boardResponsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <h3 className=" text-foreground mb-6 text-centertext-xl font-bold">
                  Board Composition
                </h3>
                <div className="space-y-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Independent Directors</h4>
                    <p className="text-sm text-muted-foreground">
                      Majority independent directors ensure objective oversight and prevent conflicts of interest
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Expertise Diversity</h4>
                    <p className="text-sm text-muted-foreground">
                      Board members bring expertise in regenerative agriculture, finance, law, and nonprofit management
                    </p>
                  </div>
                  
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Term Limits</h4>
                    <p className="text-sm text-muted-foreground">
                      Three-year terms with option for reappointment, ensuring fresh perspectives and accountability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies and Procedures */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Policies & <span className="gradient-text">Procedures</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              ZenTrust maintains comprehensive policies to ensure ethical operations, 
              legal compliance, and protection of all stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {policies.map((policy, index) => (
              <div key={index} className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {policy.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {policy.description}
                </p>
                <div className="bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-2">
                  <p className="text-xs text-emerald-800 dark:text-emerald-200">
                    <strong>Status:</strong> {policy.status}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              All governance documents are available upon request to donors, grantors, 
              and other stakeholders for transparency and accountability.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Request Governance Documents</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* International Grantmaking */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              International <span className="gradient-text">Grantmaking</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              ZenTrust's grantmaking programs maintain rigorous oversight and compliance 
              with IRS regulations for international charitable activities.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Due Diligence</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive vetting of potential grantees including financial stability, 
                  mission alignment, and compliance history.
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Ongoing Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Regular reporting requirements, site visits, and progress tracking 
                  to ensure grant funds are used appropriately.
                </p>
              </div>
              
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-3">Impact Evaluation</h3>
                <p className="text-sm text-muted-foreground">
                  Independent third-party evaluation of grant outcomes and 
                  lessons learned for continuous improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Stewardship Rights */}
<section className="py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
        Stewardship <span className="gradient-text">Rights</span>
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        ZenTrust affirms the rights of all individuals who voluntarily engage with our
        regenerative ecosystem. These rights reflect autonomy, clarity, transparency,
        and sovereignty — not fundraising or solicitation obligations.
      </p>

      <div className="glass-card rounded-2xl p-8 mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Your Rights as a ZenTrust Participant & Steward
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Clarity & Transparency</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Understand how resources are stewarded</li>
              <li>• Access governance and compliance information</li>
              <li>• Receive communication grounded in honesty and accuracy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Privacy & Autonomy</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Control over personal data and communication preferences</li>
              <li>• Engage privately or anonymously when desired</li>
              <li>• Withdraw or modify participation at any time</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/stewardship-rights">
            View Full Stewardship Rights
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/contact">
            Contact Us About Governance or Rights
          </Link>
        </Button>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
