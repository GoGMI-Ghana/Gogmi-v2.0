import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured Courses for Auto-Slider - FIXED LINK
  const featuredCourses = [
    {
      id: 'maritime-governance',
      status: 'Active',
      badge: '2026 TRAINING COURSE ALERT!',
      comingSoon: 'COMING SOON',
      title: 'MARITIME GOVERNANCE COURSE:',
      subtitle: 'A FOCUS ON AFRICA',
      tagline: 'A Focus on Africa',
      fullTitle: 'MARITIME GOVERNANCE COURSE',
      description: 'Comprehensive 2-week virtual course equipping professionals with expertise to develop and implement maritime security strategies across the African continent.',
      duration: '2 weeks',
      format: 'Virtual (Zoom)',
      modules: '8 modules',
      level: 'Professional',
      faculty: ['Vice Admiral Issah Yakubu', 'Prof. Jeffrey Landsman', 'Dr. Alberta Sagoe'],
      nextIntake: 'May 5 - 14, 2026',
      image: '/maritmegovvvv.jpeg',
      bgColor: '#132552',
      accentColor: '#17A2B8',
      buttonColor: '#8E3400',
      link: '/maritime-governance-course'
    },
    {
      id: 'marine-casualty',
      status: 'Active',
      badge: '2026 EXECUTIVE TRAINING!',
      comingSoon: 'ENROLLING NOW',
      title: 'MARINE CASUALTY INVESTIGATION:',
      subtitle: 'SAFETY MANAGEMENT',
      tagline: 'Safety Management',
      fullTitle: 'MARINE CASUALTY INVESTIGATION & SAFETY MANAGEMENT',
      description: 'Executive training on conducting credible marine casualty investigations aligned with IMO Casualty Investigation Code and SOLAS requirements for maritime administrators.',
      duration: '5-Days',
      format: 'In-Person ',
      modules: '6 modules',
      level: 'Executive',
      faculty: ['Maritime Safety Experts', 'IMO Certified Investigators', 'Regional Specialists'],
      nextIntake: 'JUNE 15-19 2026',
      image: '/maricourse.jpeg', 
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
      title: 'MARINE CASUALTY INVESTIGATION & SAFETY MANAGEMENT',
      description: "Maritime and Inland Waterways (IWW) transportation safety is central to Africa's transport systems, supporting trade, passenger mobility, fishing, and livelihoods in coastal and riverine communities.Common causes include overloading, poor vessel maintenance, incompetent or unlicensed operators, absence of life-saving appliances, bad weather, weak enforcement of regulations, inadequate navigational aids, and human factors such as fatigue and drunkenness.These incidents highlight critical gaps: inadequate compliance monitoring, poor vessel maintenance, lack of standardized investigations to produce data for trend analysis and accident prevention. National Maritime Administrations need better training to enhance safety of life at sea and protection of the marine environment",
      duration: '5 days',
      format: 'In Person',
      level: 'All Levels',
      image: '/maricourse.jpeg',
      features: ['IMO Compliance', 'Expert Faculty', 'Hybrid Format','Certification'],
      nextIntake: '15-19 JUNE,2026',
      link: '/marine-casualty-course'
    },
    {
      category: 'Virtual',
      status: 'Active',
      title: 'MARITIME GOVERNANCE COURSE: A FOCUS ON AFRICA ',
      description: `For decades, the African continent has faced a wide range of maritime security threats and challenges, none of which can be fully addressed without strategic guidance. Consequently, the continent witnessed a proliferation of strategy documents, including the 2050 Africa's Integrated Maritime Strategy in 2012, the Lomé Charter in 2016, and the Africa Blue Economy Strategy in 2019.This comprehensive course equips professionals, stakeholders, and decision-makers with the knowledge, skills, and tools necessary to develop and implement effective maritime strategies within the African context.`,
      duration: '2 weeks',
      format: 'Virtual/Online',
      level: 'Beginner-Intermediate',
      image: '/maritmegovvvv.jpeg',
      features: ['8 Training Modules', 'Zoom Workshops', 'Certificate'],
      nextIntake: 'Quarterly',
      link: '/maritime-governance-course'
    },
    {
      category: 'Onsite',
      status: 'Completed',
      title: '2025 Training for Journalist and Media Practitioners on Maritime Security, Safety and Blue Economy in the Gulf of Guinea',
      description: 'To better raise awareness on maritime security issues and challenges, the EnMAR project and the Gulf of Guinea Maritime Institute (GoGMI) are launching a call for participation for a training course on: "Training for Journalists and Media Practitioners on Maritime Security, Safety and Blue Economy in the Gulf of Guinea',
      duration: '3 days',
      format: 'Hybrid',
      level: 'All Levels',
      image: '/journalist.training.webp',
      features: ['Hands-on training in open-source intelligence', 'data journalism', ' multimedia storytelling'],
      nextIntake: '7-9 October 2025',
      link: '/journalist-training'
    },
    {
      category: 'Onsite',
      status: 'Completed',
      title: 'MaSSDI Training Course',
      description: 'Platform connecting young people with maritime industry leaders to explore careers and opportunities.',
      duration: '2 months',
      format: 'Virtual/Online',
      level: 'All Levels',
      image: '/maritmegovvvv.jpeg',
      features: ['Maritime Security Strategy Theory', 'Assessing Maritime Security Challenges & Opportunities I & II', 'Interagency Coordination and Stakeholder Analysis I & II'],
      nextIntake: '6th oct - 30th Nov 2025',
      link: '/massdi'
    },
    {
      category: 'Hybrid',
      status: 'Active',
      title: 'ECOP',
      description: 'An African maritime accelerator designed to encourage youth to engage in sustainable blue economy careers.',
      duration: '12 months',
      format: 'Hybrid',
      level: 'All Levels',
      image: '/bluementorshipimage.png',
      features: ['1-on-1 Mentorship', 'Industry Networks', 'Career Guidance'],
      nextIntake: 'March 2025',
      link: '/ecop'
    },
    {
      category: 'Virtual',
      status: 'Active',
      title: 'WYTEC',
      description: `The ECOP Training Course was held twice this year in March and November 2022 as a 9-day event to equip the youth with first-hand knowledge about Africa's blue economy and expose participants to various career and business opportunities in the blue industry.`,
      duration: '4 weeks',
      format: 'Online',
      level: 'Beginner-Intermediate',
      image: '/ecop.png',
      features: ['4 Training Modules', 'Zoom Workshops', 'Certificate'],
      nextIntake: 'Quarterly',
      link: '/wytec'
    }
  ];

  const successStories = [
    {
      name: 'Ama Mensah',
      role: 'Marine Tourism Entrepreneur',
      program: 'Blue Mentorship Programme 2022',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop',
      quote: 'The Blue Mentorship Programme connected me with industry leaders who helped me launch my sustainable coastal tourism business.',
      impact: '€50K revenue, 15 jobs created'
    },
    {
      name: 'Kwesi Boateng',
      role: 'Maritime Security Analyst',
      program: 'Maritime Security Training 2023',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop',
      quote: 'The advanced training equipped me with practical skills in threat assessment and regional coordination.',
      impact: 'Leading regional security projects'
    }
  ];

  const impactMetrics = [
    { label: 'Training Programs', value: '5+', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Professionals Certified', value: '100+', icon: <Award className="w-6 h-6" /> },
    { label: 'Partner Organizations', value: '15+', icon: <Building2 className="w-6 h-6" /> }
  ];

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(p => p.category === activeCategory);

  // Auto-slide functionality - advance every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCourses.length);
    }, 15000); // 15 seconds

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

  // Handle navigation with fallback
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
            alt="Capacity Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(19, 37, 82, 0.92) 0%, rgba(26, 51, 108, 0.88) 100%)' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl leading-tight mb-8"
                style={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
             Capacity Building 
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed mb-10" style={{ fontWeight: 400, color: 'rgba(255, 255, 255, 0.95)' }}>
            We specialize in training programs and mentoring initiatives for marine professionals, stakeholders, women,
             and youth in the blue economy, as well as maritime safety and security.
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
                <span>Explore Our Learning Management System</span>
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
                  Our Impact
                </h3>
              </div>
              <span className="text-sm" style={{ fontWeight: 600, color: '#4B5563' }}>Since 2020</span>
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
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: '#8E3400' }}>FEATURED COURSE</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-4"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              Now Enrolling: {featuredCourses[currentSlide].title.split(':')[0]}
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: '#4B5563' }}>
              Professional development in maritime security strategy for African practitioners
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
                                <span className="font-semibold">Duration</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.duration}
                              </p>
                            </div>
                            
                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <Monitor className="w-4 h-4" />
                                <span className="font-semibold">Format</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.format}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <BookOpen className="w-4 h-4" />
                                <span className="font-semibold">Modules</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.modules}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center gap-2 text-sm mb-1" style={{ color: '#6B7280' }}>
                                <GraduationCap className="w-4 h-4" />
                                <span className="font-semibold">Level</span>
                              </div>
                              <p className="text-base font-bold" style={{ color: '#132552' }}>
                                {course.level}
                              </p>
                            </div>
                          </div>

                          {/* Distinguished Faculty */}
                          <div className="mb-8">
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
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                              onClick={() => handleCourseNavigation(course)}
                              className="flex-1 text-center px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 shadow-lg text-white"
                              style={{ backgroundColor: course.buttonColor }}
                            >
                              View Full Program →
                            </button>
                            <button
                              onClick={() => handleCourseNavigation(course)}
                              className="flex-1 text-center px-6 py-4 rounded-xl font-bold transition-all hover:scale-105 border-2 bg-white"
                              style={{ borderColor: '#132552', color: '#132552' }}
                            >
                              Apply Now
                            </button>
                          </div>

                          {/* Next Intake */}
                          <div className="flex items-center gap-2 text-sm" style={{ color: '#8E3400' }}>
                            <Calendar className="w-4 h-4" />
                            <span className="font-bold">Next Intake: {course.nextIntake}</span>
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
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: '#8E3400' }}>All Programs</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-4"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              Comprehensive Training Portfolio
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4B5563' }}>
              Comprehensive programs for every stage of your maritime career
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
                      {program.status}
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
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS STORIES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <span className="text-sm uppercase tracking-wider" style={{ fontWeight: 600, color: '#8E3400' }}>Success Stories</span>
            <h2 className="text-4xl md:text-5xl mt-4 mb-4"
                style={{ fontWeight: 900, color: '#132552', letterSpacing: '-0.02em' }}>
              Alumni Making Waves
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {successStories.map((story, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl text-white mb-1" style={{ fontWeight: 900 }}>
                      {story.name}
                    </h3>
                    <p className="text-sm mb-2" style={{ fontWeight: 600, color: '#8E3400' }}>
                      {story.role}
                    </p>
                    <div className="flex items-center gap-2 text-white text-xs">
                      <Award className="w-3 h-3" />
                      <span style={{ fontWeight: 600 }}>{story.program}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-2 mb-4">
                    <Star className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#8E3400' }} />
                    <p className="text-sm leading-relaxed italic" style={{ fontWeight: 400, color: '#4B5563' }}>
                      "{story.quote}"
                    </p>
                  </div>
                  
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" style={{ color: '#8E3400' }} />
                      <span className="text-sm" style={{ fontWeight: 700, color: '#132552' }}>
                        {story.impact}
                      </span>
                    </div>
                  </div>
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
