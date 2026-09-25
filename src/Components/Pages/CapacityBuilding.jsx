import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Users,
  Award,
  BookOpen,
  Building2,
  Clock,
  MapPin,
  TrendingUp,
  Star,
  BarChart3,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Monitor,
  GraduationCap
} from 'lucide-react';

const CapacityBuilding = () => {
  const { t } = useTranslation('capacityBuilding');
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured Courses for Auto-Slider - FIXED LINK
  const featuredCourses = [
    {
      id: 'maritime-governance',
      status: t('featured.courses.maritime-governance.status'),
      badge: t('featured.courses.maritime-governance.badge'),
      comingSoon: t('featured.courses.maritime-governance.comingSoon'),
      title: t('featured.courses.maritime-governance.title'),
      subtitle: t('featured.courses.maritime-governance.subtitle'),
      tagline: t('featured.courses.maritime-governance.tagline'),
      fullTitle: t('featured.courses.maritime-governance.fullTitle'),
      description: t('featured.courses.maritime-governance.description'),
      duration: t('featured.courses.maritime-governance.duration'),
      format: t('featured.courses.maritime-governance.format'),
      modules: t('featured.courses.maritime-governance.modules'),
      level: t('featured.courses.maritime-governance.level'),
      nextIntake: t('featured.courses.maritime-governance.nextIntake'),
      image: '/margov-coh2.jpeg',
      bgColor: '#132552',
      accentColor: '#17A2B8',
      buttonColor: '#8E3400',
      link: '/maritime-governance-course'
    },
    {
      id: 'marine-casualty',
      status: t('featured.courses.marine-casualty.status'),
      badge: t('featured.courses.marine-casualty.badge'),
      comingSoon: t('featured.courses.marine-casualty.comingSoon'),
      title: t('featured.courses.marine-casualty.title'),
      subtitle: t('featured.courses.marine-casualty.subtitle'),
      tagline: t('featured.courses.marine-casualty.tagline'),
      fullTitle: t('featured.courses.marine-casualty.fullTitle'),
      description: t('featured.courses.marine-casualty.description'),
      duration: t('featured.courses.marine-casualty.duration'),
      format: t('featured.courses.marine-casualty.format'),
      modules: t('featured.courses.marine-casualty.modules'),
      level: t('featured.courses.marine-casualty.level'),
      faculty: ['Maritime Safety Experts', 'IMO Certified Investigators', 'Regional Specialists'],
      nextIntake: t('featured.courses.marine-casualty.nextIntake'),
      image: '/marinecasualtylatest.jpeg',
      bgColor: '#8E3400',
      accentColor: '#FF6B35',
      buttonColor: '#132552',
      link: '/marine-casualty-course'
    }
  ];

  // Core Programs - with status and links
  const programs = [
    {
      category: 'Hybrid',
      status: 'Active',
      title: t('programs.items.marineCasualty.title'),
      description: t('programs.items.marineCasualty.description'),
      duration: t('programs.items.marineCasualty.duration'),
      format: t('programs.items.marineCasualty.format'),
      level: t('programs.items.marineCasualty.level'),
      image: '/maricourse.jpeg',
      features: t('programs.items.marineCasualty.features', { returnObjects: true }),
      nextIntake: t('programs.items.marineCasualty.nextIntake'),
      link: '/marine-casualty-course'
    },
    {
      category: 'Virtual',
      status: 'Active',
      title: t('programs.items.maritimeGovernance.title'),
      description: t('programs.items.maritimeGovernance.description'),
      duration: t('programs.items.maritimeGovernance.duration'),
      format: t('programs.items.maritimeGovernance.format'),
      level: t('programs.items.maritimeGovernance.level'),
      image: '/maritmegovvvv.jpeg',
      features: t('programs.items.maritimeGovernance.features', { returnObjects: true }),
      nextIntake: t('programs.items.maritimeGovernance.nextIntake'),
      link: '/maritime-governance-course'
    },
    {
      category: 'Onsite',
      status: 'Completed',
      title: t('programs.items.journalistTraining.title'),
      description: t('programs.items.journalistTraining.description'),
      duration: t('programs.items.journalistTraining.duration'),
      format: t('programs.items.journalistTraining.format'),
      level: t('programs.items.journalistTraining.level'),
      image: '/journalist.training.webp',
      features: t('programs.items.journalistTraining.features', { returnObjects: true }),
      nextIntake: t('programs.items.journalistTraining.nextIntake'),
      link: '/journalist-training'
    },
    {
      category: 'Onsite',
      status: 'Completed',
      title: t('programs.items.massdi.title'),
      description: t('programs.items.massdi.description'),
      duration: t('programs.items.massdi.duration'),
      format: t('programs.items.massdi.format'),
      level: t('programs.items.massdi.level'),
      image: '/maritmegovvvv.jpeg',
      features: t('programs.items.massdi.features', { returnObjects: true }),
      nextIntake: t('programs.items.massdi.nextIntake'),
      link: '/massdi'
    },
    {
      category: 'Hybrid',
      status: 'Completed',
      title: t('programs.items.blueMentorship.title'),
      description: t('programs.items.blueMentorship.description'),
      duration: t('programs.items.blueMentorship.duration'),
      format: t('programs.items.blueMentorship.format'),
      level: t('programs.items.blueMentorship.level'),
      image: '/bluementorshipimage.png',
      features: t('programs.items.blueMentorship.features', { returnObjects: true }),
      nextIntake: t('programs.items.blueMentorship.nextIntake'),
      link: '/blue-mentorship'
    },
    {
      category: 'Hybrid',
      status: 'Active',
      title: t('programs.items.ecop.title'),
      description: t('programs.items.ecop.description'),
      duration: t('programs.items.ecop.duration'),
      format: t('programs.items.ecop.format'),
      level: t('programs.items.ecop.level'),
      image: '/bluementorshipimage.png',
      features: t('programs.items.ecop.features', { returnObjects: true }),
      nextIntake: t('programs.items.ecop.nextIntake'),
      link: '/ecop'
    },
    {
      category: 'Virtual',
      status: 'Active',
      title: t('programs.items.wytec.title'),
      description: t('programs.items.wytec.description'),
      duration: t('programs.items.wytec.duration'),
      format: t('programs.items.wytec.format'),
      level: t('programs.items.wytec.level'),
      image: '/ecop.png',
      features: t('programs.items.wytec.features', { returnObjects: true }),
      nextIntake: t('programs.items.wytec.nextIntake'),
      link: '/wytec'
    }
  ];

  const successStories = [
    {
      name: 'Thomas Lartey',
      role: t('alumni.roles.thomasLartey'),
      program: 'WYTEC Blue Project',
      linkedin: 'https://www.linkedin.com/in/thomas-lartey-739a85223',
    },
    {
      name: 'Clement Kwara',
      role: t('alumni.roles.clementKwara'),
      program: 'WYTEC Blue Project',
      linkedin: 'https://www.linkedin.com/in/clement-k-aa859211b',
    },
  ];

  const impactMetrics = [
    { label: t('impact.metrics.trainingPrograms'), value: '5+', icon: <BookOpen className="w-6 h-6" /> },
    { label: t('impact.metrics.professionalsTrained'), value: '100+', icon: <Award className="w-6 h-6" /> },
    { label: t('impact.metrics.partnerOrganizations'), value: '15+', icon: <Building2 className="w-6 h-6" /> }
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(p => p.category === activeCategory);

  // Auto-slide functionality - advance every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [featuredCourses.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleCourseNavigation = (course) => {
    if (course.id === 'maritime-governance') {
      navigate('/maritime-governance-course');
    } else if (course.id === 'marine-casualty') {
      navigate('/marine-casualty-course');
    } else {
      navigate(course.link);
    }
  };

  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      
      {/* HERO SECTION */}
      <section className="relative text-white py-24 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&fit=crop&q=90"
            alt={t('hero.heading')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19, 37, 82, 0.92) 0%, rgba(26, 51, 108, 0.88) 100%)' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-8"
                style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
             {t('hero.heading')}
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed mb-10" style={{ fontWeight: 400, color: 'rgba(255, 255, 255, 0.95)' }}>
            {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://lms.gogmi.org.gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl transition-all shadow-xl hover:scale-105"
                style={{ fontWeight: 700, backgroundColor: '#8E3400', color: 'white' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#6B2700'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8E3400'}
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT DASHBOARD */}
      <section className="relative -mt-20 z-20 px-6 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white rounded-3xl p-8 shadow-2xl" style={{ border: '2px solid #F5F7FA' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" style={{ color: '#8E3400' }} />
                <h3 className="text-2xl" style={{ fontWeight: 900, color: '#132552' }}>
                  {t('impact.heading')}
                </h3>
              </div>
              <span className="text-sm" style={{ fontWeight: 600, color: '#4B5563' }}>{t('impact.since')}</span>
            </div>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
                {impactMetrics.map((metric, idx) => (
                  <div key={idx} className="text-center p-6 rounded-2xl transition-all hover:scale-105" 
                       style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="inline-flex p-3 rounded-xl mb-3" style={{ backgroundColor: 'rgba(142, 52, 0, 0.1)', color: '#8E3400' }}>
                      {metric.icon}
                    </div>
                    <div className="text-3xl mb-2" style={{ fontWeight: 900, color: '#132552' }}>
                      {metric.value}
                    </div>
                    <p className="text-sm" style={{ fontWeight: 600, color: '#4B5563' }}>{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COURSES - AUTO-SLIDING CAROUSEL */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: '#8E3400' }}>{t('featured.eyebrow')}</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-4"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('featured.headingPrefix')}: {featuredCourses[currentSlide].title.split(':')[0]}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563' }}>
              {t('featured.subtitle')}
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative max-w-7xl mx-auto">
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-20 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
              style={{ color: '#132552' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-20 bg-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
              style={{ color: '#132552' }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Slides */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredCourses.map((course, idx) => (
                  <div key={idx} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                      <div className="grid md:grid-cols-5 gap-0">
                        
                        {/* LEFT - Course Poster IMAGE ONLY */}
                        <div className="md:col-span-2 relative overflow-hidden bg-gray-100">
                          <img 
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-contain"
                            style={{ minHeight: '600px' }}
                          />
                        </div>

                        {/* RIGHT - Course Details */}
                        <div className="md:col-span-3 p-8 md:p-10 bg-gray-50">
                          <div className="mb-8">
                            <h3 className="text-3xl md:text-4xl font-black mb-3"
                                style={{ color: '#132552' }}>
                              {course.fullTitle}
                            </h3>
                            <p className="text-lg font-semibold mb-4"
                               style={{ color: course.bgColor }}>
                              {course.tagline}
                            </p>
                            <p className="text-base leading-relaxed" 
                               style={{ color: '#4B5563' }}>
                              {course.description}
                            </p>
                          </div>

                          {/* Course Stats */}
                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <Clock className="w-4 h-4" />
                                <span className="font-semibold">{t('featured.stats.duration')}</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.duration}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <Monitor className="w-4 h-4" />
                                <span className="font-semibold">{t('featured.stats.format')}</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.format}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <BookOpen className="w-4 h-4" />
                                <span className="font-semibold">{t('featured.stats.modules')}</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.modules}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <GraduationCap className="w-4 h-4" />
                                <span className="font-semibold">{t('featured.stats.level')}</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.level}
                              </p>
                            </div>
                          </div>

                          {/* Distinguished Faculty - commented out until faculty data is available */}
                          {/* <div className="mb-8">
                            <h4 className="text-sm font-bold uppercase tracking-wide mb-3"
                                style={{ color: '#6B7280' }}>
                              Distinguished Faculty
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {course.faculty.map((name, i) => (
                                <div key={i} className="bg-white px-4 py-2 rounded-lg border border-gray-200">
                                  <p className="text-sm font-semibold" style={{ color: '#132552' }}>
                                    {name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div> */}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                              onClick={() => handleCourseNavigation(course)}
                              className="flex-1 text-center px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg text-white"
                              style={{ backgroundColor: course.buttonColor }}
                            >
                              {t('featured.viewProgram')} →
                            </button>
                            <button
                              onClick={() => handleCourseNavigation(course)}
                              className="flex-1 text-center px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2 bg-white"
                              style={{ borderColor: '#132552', color: '#132552' }}
                            >
                              {t('featured.applyNow')}
                            </button>
                          </div>

                          {/* Next Intake */}
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#8E3400' }}>
                            <Calendar className="w-4 h-4" />
                            <span className="font-bold">{t('featured.nextIntake')}: {course.nextIntake}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator with Auto-Progress */}
            <div className="flex justify-center gap-3 mt-8">
              {featuredCourses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="relative h-2 rounded-full transition-all overflow-hidden"
                  style={{ 
                    backgroundColor: currentSlide === idx ? '#132552' : '#D1D5DB',
                    width: currentSlide === idx ? '48px' : '12px'
                  }}
                >
                  {currentSlide === idx && (
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 animate-progress"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Add CSS for progress animation */}
      <style>{`
        @keyframes slideProgress {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        .animate-progress {
          animation: slideProgress 15s linear infinite;
        }
      `}</style>

      {/* CORE PROGRAMS */}
      <section className="py-20" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: '#8E3400' }}>{t('programs.eyebrow')}</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-4"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              {t('programs.heading')}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
              {t('programs.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs text-white font-bold"
                          style={{ 
                            backgroundColor: program.status === 'Active' ? '#16A34A' : '#6B7280'
                          }}>
                      {t(`programs.status.${program.status}`)}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-3 text-white text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span style={{ fontWeight: 600 }}>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span style={{ fontWeight: 600 }}>{program.format}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg mb-2 leading-tight"
                      style={{ fontWeight: 900, color: '#132552' }}>
                    {program.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed mb-4" style={{ fontWeight: 400, color: '#4B5563' }}>
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {program.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 rounded text-xs"
                            style={{ fontWeight: 600, backgroundColor: '#F5F7FA', color: '#132552' }}>
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate(program.link)}
                    className="w-full px-4 py-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ fontWeight: 700, backgroundColor: '#132552', color: 'white', fontSize: '0.875rem' }}
                  >
                    {t('programs.learnMore')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    {/* SUCCESS STORIES */}
    <section style={{ backgroundColor: '#111827', padding: '96px 0 120px' }}>
      <div className="container mx-auto max-w-7xl px-6">

        {/* Top row: heading left, subtitle right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
             style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '48px' }}>
          <h2 className="text-5xl md:text-6xl font-black text-white" style={{ letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {t('alumni.heading1')}<br />{t('alumni.heading2')}
          </h2>
          <p className="md:max-w-xs text-sm leading-relaxed md:text-right" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {t('alumni.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {successStories.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl flex flex-col gap-10"
              style={{
                backgroundColor: '#1a2332',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '32px',
              }}
            >
              {/* Programme tag */}
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {s.program}
              </span>

              {/* Name + role */}
              <div>
                <p className="text-2xl font-black text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{s.name}</p>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{s.role}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ backgroundColor: '#8E3400', color: 'white' }}
                  >
                    {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>{t('alumni.programTag')}</span>
                </div>
                <a
                  href={s.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-60"
                  style={{ color: '#C4501A' }}
                >
                  {t('alumni.linkedinLabel')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    </div>
  );
};

export default CapacityBuilding;
