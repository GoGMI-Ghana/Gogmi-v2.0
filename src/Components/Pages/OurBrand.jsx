import React, { useState } from 'react';
import { Palette, Download, Check, Copy, Type } from 'lucide-react';

const BRAND_COLORS = [
  { name: 'Primary Navy', hex: '#132552', usage: 'Headers, navigation, primary text' },
  { name: 'Accent Rust', hex: '#8E3400', usage: 'Buttons, highlights, calls to action' },
  { name: 'Off-White', hex: '#F5F7FA', usage: 'Backgrounds, light surfaces' },
  { name: 'Dark Slate', hex: '#1F2933', usage: 'Body copy on light backgrounds' },
];

const ColorSwatch = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-left bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
    >
      <div className="h-24 w-full" style={{ backgroundColor: color.hex }} />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold" style={{ color: '#132552' }}>{color.name}</h3>
          {copied ? (
            <Check className="w-4 h-4 text-emerald-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
          )}
        </div>
        <p className="text-sm font-mono text-gray-500 mt-1">{copied ? 'Copied!' : color.hex}</p>
        <p className="text-sm text-gray-600 mt-2">{color.usage}</p>
      </div>
    </button>
  );
};

const OurBrand = () => {
  const handleLogoDownload = () => {
    const l = document.createElement('a');
    l.href = '/GoGMI_PNG.png';
    l.download = 'GoGMI-Logo.png';
    l.target = '_blank';
    document.body.appendChild(l);
    l.click();
    document.body.removeChild(l);
  };

  const handleBrandKitDownload = () => {
    const l = document.createElement('a');
    l.href = '/resources/pdfs/GoGMI-Brand-Kit.pdf';
    l.download = 'GoGMI-Brand-Kit.pdf';
    l.target = '_blank';
    document.body.appendChild(l);
    l.click();
    document.body.removeChild(l);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #132552 0%, #0c1a3d 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-28 md:pt-36 pb-14 md:pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">
            <Palette className="w-3.5 h-3.5" />
            Brand Identity
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white max-w-2xl" style={{ letterSpacing: '-0.02em' }}>
            Our Brand
          </h1>
          <p className="text-white/60 mt-4 max-w-xl text-base sm:text-lg">
            Logo, colors, and typography that represent the Gulf of Guinea Maritime Institute.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12 pb-20 space-y-16">
        {/* Logo */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#132552' }}>Logo</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex items-center justify-center">
              <img src="/GoGMI_PNG.png" alt="GoGMI Logo on light background" className="h-24 w-24 object-contain" />
            </div>
            <div className="rounded-2xl shadow-sm p-10 flex items-center justify-center" style={{ backgroundColor: '#132552' }}>
              <img src="/GoGMI_PNG.png" alt="GoGMI Logo on dark background" className="h-24 w-24 object-contain" />
            </div>
          </div>
          <button
            onClick={handleLogoDownload}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white transition-all hover:scale-105"
            style={{ backgroundColor: '#8E3400' }}
          >
            <Download className="w-4 h-4" />
            Download Logo (PNG)
          </button>
        </section>

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#132552' }}>Colors</h2>
          <p className="text-gray-600 mb-6">Click a swatch to copy its hex code.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BRAND_COLORS.map((color) => (
              <ColorSwatch key={color.hex} color={color} />
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#132552' }}>Typography</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              <Type className="w-4 h-4" />
              Primary Typeface
            </div>
            <p className="text-4xl font-black mb-2" style={{ color: '#132552', fontFamily: "'Inter', sans-serif" }}>
              Inter
            </p>
            <p className="text-gray-600">
              Used across the site for headings and body copy, in Bold (700) and Semibold (600) weights for headings, Regular (400) for body text.
            </p>
          </div>
        </section>

        {/* Brand Kit */}
        <section>
          <div
            className="rounded-2xl p-8 md:p-10 text-center"
            style={{ background: 'linear-gradient(135deg, #132552 0%, #0c1a3d 100%)' }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Full Brand Kit</h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Download the complete GoGMI brand guidelines, including logo variations, color palette, and usage rules.
            </p>
            <button
              onClick={handleBrandKitDownload}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-base font-bold transition-all hover:scale-105 shadow-xl border-2 border-white/30 hover:bg-white/10"
              style={{ color: 'white' }}
            >
              <Download className="w-5 h-5" />
              <span>Download Brand Kit</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurBrand;
