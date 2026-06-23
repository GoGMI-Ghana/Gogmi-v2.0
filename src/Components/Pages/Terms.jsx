import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Mail } from 'lucide-react';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By accessing or using the GoGMI website (gogmi.org.gh) and any of its associated services, programmes, or platforms, you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of our services. GoGMI reserves the right to update these terms at any time, and continued use of the website constitutes acceptance of any changes.`
  },
  {
    id: 'services',
    title: 'Description of Services',
    content: `The Gulf of Guinea Maritime Institute (GoGMI) provides information, research, training programmes, membership services, forums, and advocacy resources relating to maritime security, governance, and the blue economy in the Gulf of Guinea region. Access to certain services may require registration and is subject to additional terms specific to those programmes.`
  },
  {
    id: 'user-obligations',
    title: 'User Obligations',
    intro: 'By using our website and services, you agree to:',
    list: [
      'Provide accurate, current, and complete information when registering or submitting forms.',
      'Maintain the confidentiality of your account credentials and notify us immediately of any unauthorised access.',
      'Use the website and its content solely for lawful, personal, or professional purposes.',
      'Not reproduce, distribute, or commercially exploit any content from this website without prior written permission from GoGMI.',
      'Not engage in any conduct that disrupts or interferes with the proper functioning of the website or its services.',
      'Comply with all applicable local, national, and international laws and regulations.',
    ]
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: `All content on this website — including text, graphics, logos, images, audio clips, research publications, course materials, and software — is the property of GoGMI or its content suppliers and is protected by applicable copyright and intellectual property laws. You may not reproduce, modify, publish, or distribute any content without express written consent from GoGMI, unless otherwise permitted under applicable law.`
  },
  {
    id: 'membership',
    title: 'Membership & Registration',
    intro: 'When registering for membership or training programmes:',
    bullets: [
      { label: 'Eligibility', text: 'You must be at least 18 years of age and provide accurate personal information.' },
      { label: 'Membership fees', text: 'Are non-refundable unless otherwise stated in the specific programme terms.' },
      { label: 'Account termination', text: 'GoGMI reserves the right to suspend or terminate accounts that violate these terms.' },
      { label: 'Access', text: 'Member-only resources are for registered members only and may not be shared with third parties.' },
    ]
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers & Limitation of Liability',
    content: `GoGMI provides its website and services on an "as is" and "as available" basis. While we strive to ensure the accuracy and currency of information on this site, we make no representations or warranties of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the content. GoGMI shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, this website or its services.`
  },
  {
    id: 'third-party',
    title: 'Third-Party Links & Services',
    content: `Our website may contain links to third-party websites, partner organisations, or external resources. These links are provided for your convenience only. GoGMI has no control over the content or practices of those sites and accepts no responsibility or liability for them. The inclusion of any link does not imply endorsement by GoGMI of the linked site or its content.`
  },
  {
    id: 'privacy',
    title: 'Privacy',
    content: `Your use of GoGMI's services is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. By using our services, you consent to the collection and use of your information as described in the Privacy Policy.`
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: `These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Ghana.`
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    content: `GoGMI reserves the right to modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting to the website. It is your responsibility to review these terms periodically. Continued use of the website following any changes constitutes your acceptance of the revised terms.`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `If you have any questions or concerns regarding these Terms of Service, please contact us at info@gogmi.org.gh or through the contact form on our website.`
  },
];

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const Terms = () => {
  return (
    <div className="w-full min-h-screen" style={{ fontFamily: FONT, backgroundColor: '#F9FAFB' }}>

      {/* ═══ HERO ═══ */}
      <section className="relative py-20 md:py-28" style={{ backgroundColor: '#132552' }}>
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-8 opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: 'white' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(142,52,0,0.25)' }}>
              <FileText className="w-6 h-6" style={{ color: '#8E3400' }} />
            </div>
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#8E3400' }}>Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Terms of Service
          </h1>
          <p className="text-base" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Last updated: June 2025 &nbsp;·&nbsp; Gulf of Guinea Maritime Institute (GoGMI)
          </p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="space-y-6">
            {sections.map((section, idx) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 scroll-mt-24"
              >
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ backgroundColor: '#132552', color: 'white' }}
                  >
                    {idx + 1}
                  </span>
                  <h2 className="text-xl font-bold" style={{ color: '#132552' }}>{section.title}</h2>
                </div>

                {section.content && (
                  <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>{section.content}</p>
                )}

                {section.intro && (
                  <p className="text-base leading-relaxed mb-4" style={{ color: '#4B5563' }}>{section.intro}</p>
                )}

                {section.bullets && (
                  <ul className="space-y-4">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-base" style={{ color: '#4B5563' }}>
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                        <span><strong style={{ color: '#132552' }}>{b.label}:</strong> {b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.list && (
                  <ul className="space-y-3">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex gap-3 text-base" style={{ color: '#4B5563' }}>
                        <span className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#8E3400' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Contact card */}
            <div className="rounded-2xl p-8 md:p-10" style={{ backgroundColor: '#132552' }}>
              <h3 className="text-2xl font-bold text-white mb-3">Questions about these terms?</h3>
              <p className="text-base mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
                We're happy to clarify anything. Reach out to us directly.
              </p>
              <a
                href="mailto:info@gogmi.org.gh"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-base font-semibold transition-all hover:scale-105"
                style={{ backgroundColor: '#8E3400', color: 'white' }}
              >
                <Mail className="w-5 h-5" />
                info@gogmi.org.gh
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Terms;
