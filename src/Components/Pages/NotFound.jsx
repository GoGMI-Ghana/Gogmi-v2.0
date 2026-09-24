import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('notFound');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-5xl mx-auto text-center space-y-16">
        
        {/* ===== Animated 404 ===== */}
        <div className="relative mb-12">
          <h1 className="text-[160px] md:text-[260px] font-bold text-white/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
              <svg className="w-16 h-16 md:w-24 md:h-24 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ===== Message Section ===== */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t('heading')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t('message')}
          </p>
        </div>

   {/* ===== Buttons Section ===== */}
   
<div className="flex flex-col sm:flex-row gap-6 justify-center mt-10 mb-16">
  <Link 
    to="/" 
    className="group bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-600 transition-all shadow-2xl hover:scale-105 flex items-center justify-center space-x-2 pb-6"
  >
    <Home className="w-5 h-5" />
    <span>{t('goHome')}</span>
  </Link>
  <button
    onClick={() => window.history.back()}
    className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center space-x-2 pb-6"
  >
    <ArrowLeft className="w-5 h-5" />
    <span>{t('goBack')}</span>
  </button>
</div>
{/* ===== End Buttons Section ===== */}

        

        {/* ===== Helpful Links Section ===== */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 space-y-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-6">{t('popularPages')}</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { key: 'aboutUs', path: '/about', icon: <Search /> },
              { key: 'services', path: '/services', icon: <Search /> },
              { key: 'contact', path: '/contact', icon: <Mail /> }
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-4 rounded-xl text-white font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2"
              >
                {link.icon}
                <span>{t(`links.${link.key}`)}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ===== Support Section ===== */}
        <div className="mt-16 space-y-4">
          <p className="text-white/70 text-lg">{t('supportPrompt')}</p>
          <Link
            to="/contact"
            className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors inline-flex items-center space-x-2"
          >
            <Mail className="w-5 h-5" />
            <span>{t('contactSupport')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
