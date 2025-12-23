import Link from 'next/link'
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

const footerLinks = {
  programs: [
    { name: 'All Programs', href: '/programs' },
    { name: 'Education & Training', href: '/programs?category=Education' },
    { name: 'Research & Innovation', href: '/programs?category=Research' },
    { name: 'Community Initiatives', href: '/programs?category=Community' },
  ],
  organization: [
    { name: 'About Us', href: '/about' },
    { name: 'Governance & Policies', href: '/governance' },
    { name: 'Questions', href: '/questions' },
    { name: 'Contact Us', href: '/contact' },
  ],
  resources: [
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Stewardship Rights', href: '/stewardship-rights' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
  support: [
    { name: 'Stewardship Portal', href: 'https://www.zentrust.world/stewardship' },
    { name: 'Partnership', href: '/partner' },
    { name: 'General Inquiries', href: '/contact' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/zentrust' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/zentrust' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/zentrust' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">

            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Leaf className="h-8 w-8 text-primary" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
                </div>
                <span className="text-2xl font-bold gradient-text">
                  ZenTrust
                </span>
              </div>

              <p className="text-muted-foreground mb-6 max-w-md">
                Advancing regenerative agriculture, ecological restoration, 
                and open scientific education to support healthier ecosystems 
                and thriving communities.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>hello@zentrust.org</span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (508) 317-7517</span>
                </div>

                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>2 Reserve Way, Duxbury, MA 02332, USA</span>
                </div>
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Programs</h3>
              <ul className="space-y-2">
                {footerLinks.programs.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organization */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Organization</h3>
              <ul className="space-y-2">
                {footerLinks.organization.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Participation */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Participation</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

            <div className="text-center md:text-left space-y-2">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ZenTrust. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                ZenTrust, Inc. is a 501(c)(3) public charity. EIN: 33-4318487.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}
