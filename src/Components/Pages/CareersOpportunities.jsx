import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, GraduationCap, Globe, TrendingUp, Search, Filter, ChevronRight, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Careers = () => {
  const { t } = useTranslation('careers');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryIds = ['all', 'research', 'policyAdvocacy', 'operations', 'communications', 'finance', 'it'];
  const typeIds = ['all', 'fullTime', 'partTime', 'internship', 'volunteer'];

  const openPositionsMeta = [
    {
      id: 1,
      categoryId: 'strategicLeadership',
      typeId: 'fullTime',
      location: 'Accra, Ghana',
    },
    // {
    //   id: 2,
    //   title: 'Head of Technical ',
    //   category: 'Research',
    //   type: 'Full-Time',
    //   location: 'Accra, Ghana',
    //   experience: '3-5 years',
    //   deadline: 'December 20, 2024',
    //   description: 'Conduct marine ecosystem research and contribute to sustainable blue economy initiatives. Work with coastal communities and scientific institutions.',
    //   requirements: ['PhD in Marine Biology, Oceanography, or related field', 'Research experience in marine ecosystems', 'Strong analytical skills', 'Field research experience'],
    //   responsibilities: ['Design and execute research projects', 'Analyze marine data', 'Publish scientific papers', 'Collaborate with research partners']
    // },
    // {
    //   id: 3,
    //   title: 'Research Analyst ',
    //   category: 'Research',
    //   type: 'Full-Time',
    //   location: 'Accra, Ghana',
    //   experience: '2-4 years',
    //   deadline: 'January 10, 2025',
    //   description: 'Manage organizational communications, social media presence, and stakeholder engagement. Create compelling content about maritime issues.',
    //   requirements: ['Bachelors in Communications, Journalism, or related field', 'Proven content creation experience', 'Social media expertise', 'Excellent writing skills'],
    //   responsibilities: ['Develop communication strategies', 'Manage social media platforms', 'Create engaging content', 'Coordinate media relations']
    // },
    
  
  
  ];

  const openPositions = openPositionsMeta.map(meta => ({
    ...meta,
    title: t(`jobs.${meta.id}.title`),
    category: t(`jobs.${meta.id}.category`),
    typeLabel: t(`types.${meta.typeId}`),
    experience: t(`jobs.${meta.id}.experience`),
    deadline: t(`jobs.${meta.id}.deadline`),
    description: t(`jobs.${meta.id}.description`),
    requirements: t(`jobs.${meta.id}.requirements`, { returnObjects: true }),
    responsibilities: t(`jobs.${meta.id}.responsibilities`, { returnObjects: true }),
  }));

  const filteredJobs = openPositions.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.categoryId === selectedCategory;
    const matchesType = selectedType === 'all' || job.typeId === selectedType;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Section with Image */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&auto=format&fit=crop&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-[#8E3400]/20 backdrop-blur-sm px-6 py-3 rounded-full border border-[#8E3400]/30 mb-8">
            <Briefcase className="w-5 h-5 text-[#8E3400]" />
            <span className="text-white font-semibold text-sm uppercase tracking-wide" style={{ fontWeight: 600 }}>{t('hero.badge')}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight" style={{ fontWeight: 900 }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontWeight: 400 }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-[#8E3400] font-semibold text-sm uppercase tracking-wider" style={{ fontWeight: 600 }}>{t('positions.eyebrow')}</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#132552] mt-4 mb-6" style={{ fontWeight: 900 }}>{t('positions.heading')}</h2>
            <p className="text-lg text-gray-600" style={{ fontWeight: 400 }}>{t('positions.subtitle')}</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('filters.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400]"
                  style={{ fontWeight: 400 }}
                />
              </div>
              
              <div className="flex gap-3 w-full lg:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-1 lg:flex-initial px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] cursor-pointer"
                  style={{ fontWeight: 400 }}
                >
                  {categoryIds.map(id => (
                    <option key={id} value={id}>{t(`categories.${id}`)}</option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="flex-1 lg:flex-initial px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8E3400] cursor-pointer"
                  style={{ fontWeight: 400 }}
                >
                  {typeIds.map(id => (
                    <option key={id} value={id}>{t(`types.${id}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-gray-600 mt-4" style={{ fontWeight: 400 }}>
              {t('filters.showingPrefix')} <span className="font-bold text-[#132552]" style={{ fontWeight: 700 }}>{filteredJobs.length}</span> {t('filters.positionCount', { count: filteredJobs.length })}
            </p>
          </div>

          {/* Job Listings */}
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-4" style={{ fontWeight: 400 }}>{t('empty.message')}</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedType('all'); }}
                className="px-6 py-3 bg-[#8E3400] text-white rounded-lg hover:bg-[#6B2700] transition-all"
                style={{ fontWeight: 600 }}
              >
                {t('empty.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="px-4 py-1.5 bg-[#132552] text-white rounded-full text-sm font-semibold" style={{ fontWeight: 600 }}>
                          {job.category}
                        </span>
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                          job.typeId === 'fullTime' ? 'bg-green-100 text-green-700' :
                          job.typeId === 'partTime' ? 'bg-blue-100 text-blue-700' :
                          job.typeId === 'internship' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-purple-100 text-purple-700'
                        }`} style={{ fontWeight: 600 }}>
                          {job.typeLabel}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#132552] mb-3" style={{ fontWeight: 700 }}>{job.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4" style={{ fontWeight: 400 }}>{job.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600" style={{ fontWeight: 400 }}>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#8E3400]" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[#8E3400]" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#8E3400]" />
                          <span>{t('job.applyBy', { date: job.deadline })}</span>
                        </div>
                      </div>
                    </div>

                    <button className="lg:flex-shrink-0 bg-[#8E3400] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6B2700] transition-all shadow-lg hover:scale-105 flex items-center justify-center gap-2" style={{ fontWeight: 700 }}>
                      <span>{t('job.closed')}</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Unsolicited Applications */}
      <section className="py-20 bg-gray-50">
        
      </section>

      {/* CTA */}
     
    </div>
  );
};

export default Careers;
