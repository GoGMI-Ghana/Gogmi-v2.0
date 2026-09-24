import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Scale,
  Users,
  FileText,
  Target,
  TrendingUp,
  Globe,
  CheckCircle,
  Award,
  BookOpen,
  MessageSquare,
  ExternalLink,
  Download,
  Calendar,
  Shield,
  Anchor,
  Waves
} from 'lucide-react';

const Advocacy = () => {
  const { t } = useTranslation('advocacy');
  const [activeTab, setActiveTab] = useState('all');

  const policyAreas = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Maritime Security',
      description: 'Advocating for enhanced regional cooperation and capacity building to combat piracy and maritime crime.',
      color: '#132552',
      initiatives: ['Regional Information Sharing', 'Naval Cooperation Frameworks', 'Port Security Standards']
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: 'Blue Economy',
      description: 'Promoting sustainable utilization of ocean resources for economic growth and marine conservation.',
      color: '#8E3400',
      initiatives: ['Sustainable Fisheries', 'Marine Tourism', 'Ocean Conservation']
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: 'Maritime Governance',
      description: 'Strengthening legal frameworks and institutional capacity for effective maritime management.',
      color: '#1A336C',
      initiatives: ['Legal Harmonization', 'Institutional Development', 'Compliance Monitoring']
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Capacity Building',
      description: 'Developing human resource capabilities across maritime institutions and communities.',
      color: '#8E3400',
      initiatives: ['Professional Training', 'Youth Programs', 'Technical Assistance']
    }
  ];



const campaignsMeta = [
    {
      status: 'active',
      supporters: 2450,
      logo: '/IMSWG LOGO WHITE BG.jpg',
      link: '/imswg'
    },
    {
      status: 'active',
      supporters: 1250,
      logo: '/GoGMI_PNG.png',
      link: '/blue-world-initiative'
    },
    {
      status: 'completed',
      supporters: 3200,
      logo: '/bluecareer.webp',
      link: '/bluecareerexpo'
    },
    {
      status: 'completed',
      supporters: 1250,
      logo: '/GoGMI_PNG.png',
      link: '/blue-world-initiative'
    }
  ];

  const campaigns = t('campaigns', { returnObjects: true }).map((campaign, idx) => ({
    ...campaign,
    ...campaignsMeta[idx],
    statusLabel: t(`campaignStatus.${campaignsMeta[idx].status}`)
  }));
  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* HERO SECTION */}
      <section className="relative text-white py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&fit=crop&q=90" 
            alt="Advocacy Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19, 37, 82, 0.7) 0%, rgba(26, 51, 108, 0.65) 100%)' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-8"
                style={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
             {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed mb-10" style={{ fontWeight: 400, color: 'rgba(255, 255, 255, 0.95)' }}>
             {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl transition-all shadow-xl hover:scale-105"
                style={{ fontWeight: 700, backgroundColor: '#8E3400', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVE CAMPAIGNS */}
      <section id="campaigns" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: '#8E3400' }}>{t('campaignsSection.eyebrow')}</span>
            <h2 className="text-5xl md:text-6xl mt-4 mb-6"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('campaignsSection.heading')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                style={{ border: '2px solid #F5F7FA' }}
              >
                {/* Logo Section */}
                <div className="flex items-center justify-center mb-4 h-20">
                  <img 
                    src={campaign.logo} 
                    alt={campaign.title}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-300 text-sm">Logo</div>';
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1.5 rounded-full text-xs uppercase"
                        style={{ 
                          fontWeight: 700, 
                          backgroundColor: campaign.status === 'active' ? '#10B981' : '#6B7280', 
                          color: 'white'
                        }}>
                    {campaign.statusLabel}
                  </span>
                  <span className="text-sm" style={{ fontWeight: 600, color: '#4B5563' }}>
                    {campaign.category}
                  </span>
                </div>

                <h3 className="text-xl mb-3"
                    style={{ fontWeight: 900, color: '#132552' }}>
                  {campaign.title}
                </h3>

                <p className="text-sm leading-relaxed mb-4" style={{ fontWeight: 400, color: '#4B5563' }}>
                  {campaign.description}
                </p>

                <div className="flex items-center justify-between pt-4 mb-4" style={{ borderTop: '1px solid #F5F7FA' }}>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" style={{ color: '#8E3400' }} />
                    <span className="text-xs" style={{ fontWeight: 600, color: '#4B5563' }}>
                      {campaign.supporters}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: '#8E3400' }} />
                    <span className="text-xs" style={{ fontWeight: 600, color: '#4B5563' }}>
                      {campaign.deadline}
                    </span>
                  </div>
                </div>

                <Link
                  to={campaign.link}
                  className="block w-full px-5 py-2.5 rounded-xl text-center text-sm transition-all hover:scale-105"
                  style={{ fontWeight: 700, backgroundColor: '#132552', color: 'white' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A336C'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#132552'}
                >
                  {t('campaignsSection.readMore')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

   

    </div>
  );
};

export default Advocacy;
