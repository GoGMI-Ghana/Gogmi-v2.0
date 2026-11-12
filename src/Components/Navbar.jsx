import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Heart, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from '../context/AuthContext';

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

// Editorial header styles: a solid white bar with a hairline, the current section
// marked with a rust underline, and plain white pop-out panels.
const NAV_LINK = 'focus-ring relative whitespace-nowrap px-1 py-2 text-[0.9375rem] font-semibold transition-colors';
const NAV_ACTIVE = 'text-ink shadow-[inset_0_-2px_0_var(--color-rust)]';
const NAV_IDLE = 'text-text hover:text-rust';
const PANEL = 'absolute top-full z-50 mt-3 rounded-[2px] border border-line bg-white py-2 shadow-[0_12px_32px_rgba(12,25,56,0.10)]';
const PANEL_ITEM = 'focus-ring block w-full whitespace-nowrap px-4 py-2.5 text-left text-[0.9375rem] text-text transition-colors hover:bg-paper hover:text-ink';

const Navbar = () => {
  const { t, i18n } = useTranslation("common");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("/");

  const { isAuthenticated, user, isMember, logout } = useAuth();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setCurrentPath(location.pathname || "/");
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", name: t("nav.home"), path: "/" },
    {
      id: "aboutUs",
      name: t("nav.aboutUs"),
      path: "/about",
      dropdown: [
        { id: "whoWeAre", name: t("nav.whoWeAre"), path: "/about" },
        { id: "ourBrand", name: t("nav.ourBrand"), path: "/our-brand" },
        { id: "partners", name: t("nav.partners"), path: "/partners" },
        { id: "careers", name: t("nav.careers"), path: "/CareersOpportunities" },
        { id: "testimonials", name: t("nav.testimonials"), path: "/Testimonials" }
      ]
    },
    {
      id: "areasOfWork",
      name: t("nav.areasOfWork"),
      path: "/services",
      dropdown: [
        { id: "advocacy", name: t("nav.advocacy"), path: "/services/advocacy" },
        { id: "research", name: t("nav.research"), path: "/services/research" },
        { id: "capacityBuilding", name: t("nav.capacityBuilding"), path: "/services/CapacityBuilding" },
        { id: "secretariatServices", name: t("nav.secretariatServices"), path: "/secretariat" },
      ],
    },
    {
      id: "ourTeam",
      name: t("nav.ourTeam"),
      path: "/ExecutiveChairman",
      dropdown: [
        { id: "boardOfDirectors", name: t("nav.boardOfDirectors"), path: "/ExecutiveChairman" },
        { id: "advisoryBoard", name: t("nav.advisoryBoard"), path: "/AdvisoryBoard" },
        { id: "management", name: t("nav.management"), path: "/Management" }
      ]
    },
    {
      id: "resources",
      name: t("nav.resources"),
      path: "/resources",
      dropdown: [
        { id: "library", name: t("nav.library"), path: "/resources" },
        { id: "newsBlogs", name: t("nav.newsBlogs"), path: "/blog" },
        { id: "membership", name: t("nav.membership"), path: "/Membership" },
        { id: "gulfSpectrumPodcast", name: t("nav.gulfSpectrumPodcast"), path: "/gulf-spectrum-podcast" },
      ],
    },

  ];

  const isActive = (path) => currentPath === path;

  const handleDropdownEnter = (itemId) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setDropdownOpen(itemId);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    setUserDropdownOpen(false);
    setLangDropdownOpen(false);
  };

  // Keyboard support for the pop-out menus (WAI-ARIA disclosure pattern):
  // Escape closes the menu and returns focus to its button, and tabbing out of it closes it.
  const menuKeys = (close) => ({
    onKeyDown: (e) => {
      if (e.key === 'Escape') {
        close();
        e.currentTarget.querySelector('button')?.focus();
      }
    },
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) close();
    }
  });

  // A mouse click on a menu button keeps the hover-opened menu open; a keyboard press toggles it.
  const toggleFromButton = (e, isOpen, open, close) => {
    if (e.detail === 0 && isOpen) close();
    else open();
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      aria-label={t("nav.mainNavLabel")}
      className={`fixed top-0 left-0 right-0 z-50 border-b border-line bg-white font-body transition-[padding] duration-200 ${
        scrolled ? "py-2" : "py-3.5"
      }`}
    >
      <div className="w-full flex items-center justify-between gap-6 px-6 xl:px-10">
        {/* Logo */}
        <Link
          to="/" onClick={closeMenus} aria-current={isActive("/") ? 'page' : undefined}
          className="focus-ring flex flex-shrink-0 items-center gap-3"
          aria-label="Go to home"
        >
          <img
            src="/GoGMI_PNG.png"
            alt=""
            className={`object-contain transition-[height,width] duration-200 ${scrolled ? "h-11 w-11" : "h-14 w-14"}`}
          />
          <div>
            <div className="whitespace-nowrap font-display text-[1.375rem] font-semibold leading-tight text-ink">
              {t("brand.name")}
            </div>
            <div className="whitespace-nowrap text-xs text-muted">
              {t("brand.tagline")}
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center flex-1 justify-center">
          <div className="flex items-center gap-7">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.path}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.id)}
                  onMouseLeave={handleDropdownLeave}
                  {...menuKeys(() => setDropdownOpen(null))}
                >
                  <button
                    type="button"
                    aria-expanded={dropdownOpen === item.id}
                    aria-controls={`menu-${item.id}`}
                    onClick={(e) => toggleFromButton(e, dropdownOpen === item.id, () => handleDropdownEnter(item.id), () => setDropdownOpen(null))}
                    className={`${NAV_LINK} flex items-center gap-1 ${
                      isActive(item.path) || item.dropdown.some((sub) => isActive(sub.path)) ? NAV_ACTIVE : NAV_IDLE
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === item.id ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </button>

                  {dropdownOpen === item.id && (
                    <div id={`menu-${item.id}`} className={`${PANEL} left-0 w-64`}>
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path} onClick={closeMenus} aria-current={isActive(subItem.path) ? 'page' : undefined}
                          className={`${PANEL_ITEM} ${isActive(subItem.path) ? "font-semibold text-ink" : ""}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path} onClick={closeMenus} aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`${NAV_LINK} ${isActive(item.path) ? NAV_ACTIVE : NAV_IDLE}`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>

        {/* Desktop Right Buttons */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          <div
            className="relative"
            onMouseEnter={() => setLangDropdownOpen(true)}
            onMouseLeave={() => setLangDropdownOpen(false)}
            {...menuKeys(() => setLangDropdownOpen(false))}
          >
            <button
              type="button"
              aria-expanded={langDropdownOpen}
              aria-controls="menu-language"
              onClick={(e) => toggleFromButton(e, langDropdownOpen, () => setLangDropdownOpen(true), () => setLangDropdownOpen(false))}
              className={`${NAV_LINK} ${NAV_IDLE} flex items-center gap-1.5`}
              aria-label={`${t("nav.changeLanguage")}: ${t(`language.${i18n.resolvedLanguage || 'en'}`)}`}
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              {LANGUAGES.find((l) => l.code === i18n.resolvedLanguage)?.label || "EN"}
            </button>
            {langDropdownOpen && (
              <div id="menu-language" className={`${PANEL} right-0 w-40`}>
                {LANGUAGES.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    lang={lng.code}
                    aria-current={i18n.resolvedLanguage === lng.code ? 'true' : undefined}
                    className={`${PANEL_ITEM} ${i18n.resolvedLanguage === lng.code ? "font-semibold text-ink" : ""}`}
                  >
                    {t(`language.${lng.code}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/donate" onClick={closeMenus} aria-current={isActive("/donate") ? 'page' : undefined}
            className="focus-ring flex items-center gap-2 whitespace-nowrap rounded-[2px] border border-rust px-4 py-2.5 text-[0.9375rem] font-semibold text-rust transition-colors hover:bg-rust hover:text-white"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            {t("nav.donate")}
          </Link>
          {!isAuthenticated ? (
            <Link
              to="/login" onClick={closeMenus} aria-current={isActive("/login") ? 'page' : undefined}
              className="focus-ring whitespace-nowrap rounded-[2px] border border-ink bg-ink px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors hover:border-rust hover:bg-rust"
            >
              {t("nav.memberLogin")}
            </Link>
          ) : (
            <div className="relative" {...menuKeys(() => setUserDropdownOpen(false))}>
              <button
                type="button"
                aria-expanded={userDropdownOpen}
                aria-controls="menu-account"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="focus-ring flex items-center gap-2 whitespace-nowrap rounded-[2px] border border-line px-4 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-ink"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[150px] truncate">{user?.full_name?.split(' ')[0]}</span>
                {isMember && (
                  <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t("nav.active")}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div id="menu-account" className={`${PANEL} right-0 w-60`}>
                  <div className="border-b border-line px-4 py-3">
                    <p className="truncate text-sm font-semibold text-ink">
                      {user?.full_name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {user?.email}
                    </p>
                    {isMember && (
                      <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t("nav.activeMember")}
                      </span>
                    )}
                  </div>

                  <Link
                    to='/dashboard' onClick={closeMenus} aria-current={isActive('/dashboard') ? 'page' : undefined}
                    className={`${PANEL_ITEM} flex items-center gap-2`}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {t("nav.myDashboard")}
                  </Link>

                  <Link
                    to='/resources' onClick={closeMenus} aria-current={isActive('/resources') ? 'page' : undefined}
                    className={PANEL_ITEM}
                  >
                    {t("nav.myResources")}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="focus-ring flex w-full items-center gap-2 border-t border-line px-4 py-2.5 text-left text-[0.9375rem] text-[#B42318] transition-colors hover:bg-[#FEF3F2]"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="focus-ring p-2 text-ink lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={t("nav.toggleMenu")}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <div className="space-y-0 px-6 pb-6 pt-2">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.path}>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                    aria-expanded={dropdownOpen === item.id}
                    className="focus-ring flex w-full items-center justify-between border-b border-line px-2 py-3.5 text-left font-semibold text-ink"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen === item.id && (
                    <div className="border-b border-line bg-paper py-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path} onClick={closeMenus} aria-current={isActive(subItem.path) ? 'page' : undefined}
                          className={`focus-ring block w-full px-5 py-2.5 text-left text-[0.9375rem] ${isActive(subItem.path) ? "font-semibold text-ink" : "text-text"}`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path} onClick={closeMenus} aria-current={isActive(item.path) ? 'page' : undefined}
                  className={`focus-ring block w-full border-b border-line px-2 py-3.5 text-left font-semibold ${isActive(item.path) ? "text-rust" : "text-ink"}`}
                >
                  {item.name}
                </Link>
              )
            )}

            <div className="pt-5">
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted">
                <Globe className="h-4 w-4" aria-hidden="true" />
                {t("nav.changeLanguage")}
              </p>
              <div className="flex gap-2">
                {LANGUAGES.map((lng) => (
                  <button
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                    lang={lng.code}
                    aria-pressed={i18n.resolvedLanguage === lng.code}
                    className={`focus-ring flex-1 rounded-[2px] border py-2 text-sm font-semibold transition-colors ${
                      i18n.resolvedLanguage === lng.code ? "border-ink bg-ink text-white" : "border-line text-ink hover:border-ink"
                    }`}
                  >
                    {t(`language.${lng.code}`)}
                  </button>
                ))}
              </div>
            </div>

            <Link
              to="/donate" onClick={closeMenus} aria-current={isActive("/donate") ? 'page' : undefined}
              className="focus-ring mt-6 flex w-full items-center justify-center gap-2 rounded-[2px] border border-rust px-6 py-3 font-semibold text-rust"
            >
              <Heart className="w-4 h-4" aria-hidden="true" />
              {t("nav.donate")}
            </Link>

            {!isAuthenticated ? (
              <Link
                to="/login" onClick={closeMenus} aria-current={isActive("/login") ? 'page' : undefined}
                className="focus-ring mt-3 block w-full rounded-[2px] bg-ink px-6 py-3 text-center font-semibold text-white"
              >
                {t("nav.memberLogin")}
              </Link>
            ) : (
              <>
                <div className="mt-6 border-t border-line pt-4">
                  <div className="mb-1 flex items-center gap-2">
                    <User className="h-5 w-5 text-ink" aria-hidden="true" />
                    <p className="truncate text-sm font-semibold text-ink">
                      {user?.full_name}
                    </p>
                  </div>
                  <p className="mb-2 truncate text-xs text-muted">
                    {user?.email}
                  </p>
                  {isMember && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {t("nav.activeMember")}
                    </span>
                  )}
                </div>

                <Link
                  to='/dashboard' onClick={closeMenus} aria-current={isActive('/dashboard') ? 'page' : undefined}
                  className="focus-ring flex w-full items-center gap-2 border-b border-line px-2 py-3.5 text-left font-semibold text-ink"
                >
                  <LayoutDashboard className="w-4 h-4" aria-hidden="true" />
                  {t("nav.myDashboard")}
                </Link>

                <Link
                  to='/resources' onClick={closeMenus} aria-current={isActive('/resources') ? 'page' : undefined}
                  className="focus-ring block w-full border-b border-line px-2 py-3.5 text-left font-semibold text-ink"
                >
                  {t("nav.myResources")}
                </Link>

                <button
                  onClick={handleLogout}
                  className="focus-ring flex w-full items-center gap-2 px-2 py-3.5 text-left font-semibold text-[#B42318]"
                >
                  <LogOut className="w-4 h-4" />
                  {t("nav.logout")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
