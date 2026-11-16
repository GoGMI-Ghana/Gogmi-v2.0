import React, { useState, useRef } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Container, PageHero, TextLink } from '../ui/Editorial';
import CourseApply from '../ui/CourseApply';

const API_URL = 'https://api.gogmi.org.gh/api';
const BROCHURE_URL = '/resources/pdfs/Maritime-Governance-Course-Brochure.pdf';
const MEMBER_PRICE = 350;
const NON_MEMBER_PRICE = 450;
const DISCOUNT_PERCENT = Math.round(((NON_MEMBER_PRICE - MEMBER_PRICE) / NON_MEMBER_PRICE) * 100);

const TAB_IDS = ['overview', 'format', 'attend', 'team', 'modules'];

const BTN = 'focus-ring inline-flex items-center justify-center gap-2 rounded-[2px] border px-5 py-3 text-[0.9375rem] font-semibold transition-colors duration-150';

// First and last initials, ignoring titles such as "Prof." and "(Rtd.)".
const initials = (name) => {
  const words = name.replace(/^(Vice Admiral|Prof\.|Dr\.)\s+/, '').split(' ').filter((w) => /^[A-Z]/.test(w));
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase();
};

// Two-digit number marker used in the ruled lists.
const Num = ({ n }) => (
  <span className="text-sm font-semibold tabular-nums text-rust" aria-hidden="true">{String(n).padStart(2, '0')}</span>
);

const MaritimeGovernanceCourse = () => {
  const { t } = useTranslation('maritimeGovernanceCourse');
  const [activeTab, setActiveTab] = useState('overview');
  const [applyOpen, setApplyOpen] = useState(false);
  const tabRefs = useRef({});
  const contentRef = useRef(null);

  const moduleList = t('modules.moduleList', { returnObjects: true });
  const weeklyModuleNumbers = [[1, 2], [3, 4], [5, 6], [7, 8]];
  const weeklyBreakdown = t('modules.weeklyBreakdown', { returnObjects: true }).map((w, i) => ({ ...w, modules: weeklyModuleNumbers[i] }));
  const facultyNames = ['Vice Admiral Issah Adam Yakubu (Rtd.)', 'Prof. Jeffrey Landsman', 'Dr. Alberta Ama Sagoe'];
  const faculty = t('team.faculty', { returnObjects: true }).map((f, i) => ({ ...f, name: facultyNames[i] }));

  const selectTab = (id, focus = false) => {
    setActiveTab(id);
    if (focus) tabRefs.current[id]?.focus();
    // When the tab bar is stuck to the top, bring the new panel's start into view.
    const top = contentRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) contentRef.current.scrollIntoView({ block: 'start' });
  };

  // WAI-ARIA tabs: arrow keys move between tabs, Home/End jump to the ends.
  const onTabKeyDown = (e) => {
    const i = TAB_IDS.indexOf(activeTab);
    let next = null;
    if (e.key === 'ArrowRight') next = TAB_IDS[(i + 1) % TAB_IDS.length];
    if (e.key === 'ArrowLeft') next = TAB_IDS[(i - 1 + TAB_IDS.length) % TAB_IDS.length];
    if (e.key === 'Home') next = TAB_IDS[0];
    if (e.key === 'End') next = TAB_IDS[TAB_IDS.length - 1];
    if (next) { e.preventDefault(); selectTab(next, true); }
  };

  const openApply = () => setApplyOpen(true);

  const panelHeading = 'heading-display text-[2rem] md:text-[2.5rem]';

  return (
    <div className="w-full font-body text-text">
      {applyOpen && (
        <CourseApply
          t={t}
          courseTitle={t('hero.title')}
          endpoint={`${API_URL}/courses/maritime-governance.php`}
          courseLabel="Maritime Governance"
          refPrefix="GOGMI-MGC-"
          memberPrice={MEMBER_PRICE}
          nonMemberPrice={NON_MEMBER_PRICE}
          onClose={() => setApplyOpen(false)}
        />
      )}

      <PageHero image="/conf2.jpg" alt="" eyebrow={t('hero.badge')} title={t('hero.title')} subtitle={t('hero.subtitle')}>
        <button type="button" onClick={openApply} className={`${BTN} border-white bg-white text-ink hover:border-sand hover:bg-sand`}>
          {t('hero.applyNow')}
        </button>
        <a href={BROCHURE_URL} download className={`${BTN} border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink`}>
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>{t('hero.downloadBrochure')}</span>
          <span className="font-normal opacity-80">(PDF)</span>
        </a>
      </PageHero>

      {/* Tab bar (Material-style fixed tabs, sticky under the navigation) */}
      <div className="sticky top-[61px] z-30 border-b border-line bg-white">
        <Container>
          <div
            role="tablist"
            aria-label={t('hero.title')}
            onKeyDown={onTabKeyDown}
            className="-mx-6 flex overflow-x-auto px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TAB_IDS.map((id) => {
              const selected = activeTab === id;
              return (
                <button
                  key={id}
                  ref={(el) => { tabRefs.current[id] = el; }}
                  id={`mgc-tab-${id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`mgc-panel-${id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(id)}
                  className={`focus-ring relative whitespace-nowrap px-4 py-4 text-[0.9375rem] font-semibold transition-colors md:px-5 ${
                    selected ? 'text-ink' : 'text-muted hover:bg-paper hover:text-ink'
                  }`}
                >
                  {t(`tabs.${id}`)}
                  <span className={`absolute inset-x-0 bottom-0 h-[3px] ${selected ? 'bg-rust' : 'bg-transparent'}`} aria-hidden="true"></span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <div ref={contentRef} className="scroll-mt-[120px] bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Panels */}
            <div className="lg:col-span-8">
              <div
                id={`mgc-panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`mgc-tab-${activeTab}`}
                tabIndex={0}
                className="focus:outline-none"
              >
                {activeTab === 'overview' && (
                  <div>
                    <h2 className={panelHeading}>{t('overview.heading')}</h2>
                    <p className="prose-lead mt-6">{t('overview.intro')}</p>

                    <h3 className="mt-14 text-[1.5rem] font-bold text-ink">{t('overview.objectivesHeading')}</h3>
                    <ol className="mt-5 border-t border-line">
                      {t('overview.objectives', { returnObjects: true }).map((obj, i) => (
                        <li key={obj} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-4 text-[1.0625rem] leading-relaxed">
                          <Num n={i + 1} />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ol>

                    <h3 className="mt-14 text-[1.5rem] font-bold text-ink">{t('overview.outcomesHeading')}</h3>
                    <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">
                      {t('overview.outcomes', { returnObjects: true }).map((o) => (
                        <li key={o.title} className="bg-paper p-6">
                          <h4 className="text-[1.125rem] font-bold text-ink">{o.title}</h4>
                          <p className="mt-1.5 leading-relaxed text-muted">{o.desc}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'format' && (
                  <div>
                    <h2 className={panelHeading}>{t('format.heading')}</h2>
                    <dl className="mt-8 grid grid-cols-2 border-y border-line">
                      <div className="border-r border-line py-6 pr-6">
                        <dt className="sr-only">{t('format.weeksLabel')}</dt>
                        <dd className="text-[3.5rem] font-bold leading-none tracking-[-0.03em] text-ink">2</dd>
                        <dd className="mt-2 text-muted">{t('format.weeksLabel')}</dd>
                      </div>
                      <div className="py-6 pl-6">
                        <dt className="sr-only">{t('format.modulesLabel')}</dt>
                        <dd className="text-[3.5rem] font-bold leading-none tracking-[-0.03em] text-ink">8</dd>
                        <dd className="mt-2 text-muted">{t('format.modulesLabel')}</dd>
                      </div>
                    </dl>
                    <h3 className="mt-14 text-[1.5rem] font-bold text-ink">{t('format.liveSessionsHeading')}</h3>
                    <ul className="mt-5 space-y-3">
                      {t('format.liveSessionsList', { returnObjects: true }).map((s) => (
                        <li key={s} className="flex items-start gap-3 text-[1.0625rem] leading-relaxed">
                          <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'attend' && (
                  <div>
                    <h2 className={panelHeading}>{t('attend.heading')}</h2>
                    <ul className="mt-8 grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
                      {t('attend.groups', { returnObjects: true }).map((g) => (
                        <li key={g.title} className="border-b border-line py-5">
                          <h3 className="text-[1.125rem] font-bold text-ink">{g.title}</h3>
                          <p className="mt-1 leading-relaxed text-muted">{g.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div>
                    <h2 className={panelHeading}>{t('team.heading')}</h2>
                    <ul className="mt-8 border-t border-line">
                      {faculty.map((m) => (
                        <li key={m.name} className="flex items-start gap-5 border-b border-line py-6">
                          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-ink text-[0.9375rem] font-bold text-white" aria-hidden="true">
                            {initials(m.name)}
                          </span>
                          <div>
                            <h3 className="text-[1.25rem] font-bold text-ink">{m.name}</h3>
                            <p className="mt-0.5 font-semibold text-rust">{m.title}</p>
                            <p className="mt-1 text-muted">{m.credentials}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'modules' && (
                  <div>
                    <h2 className={panelHeading}>{t('modules.heading')}</h2>
                    <ol className="mt-8 border-t border-line">
                      {moduleList.map((module, i) => (
                        <li key={module.title} className="grid grid-cols-[2.5rem_1fr] border-b border-line py-5">
                          <Num n={i + 1} />
                          <div>
                            <h3 className="text-[1.125rem] font-bold text-ink">
                              <span className="sr-only">{i + 1}. </span>{module.title}
                            </h3>
                            <p className="mt-1 leading-relaxed text-muted">{module.description}</p>
                          </div>
                        </li>
                      ))}
                    </ol>

                    <h3 className="mt-14 text-[1.5rem] font-bold text-ink">{t('modules.weeklyBreakdownHeading')}</h3>
                    {/* Expansion panels */}
                    <div className="mt-5 border border-line">
                      {weeklyBreakdown.map((week, idx) => (
                        <details key={week.week} className="group border-b border-line last:border-b-0" open={idx === 0}>
                          <summary className="focus-ring flex cursor-pointer list-none items-center gap-4 px-5 py-4 hover:bg-paper [&::-webkit-details-marker]:hidden">
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-rust">{week.week}</span>
                              <span className="block text-[1.125rem] font-bold text-ink">{week.title}</span>
                            </span>
                            <span className="hidden text-sm text-muted sm:inline">
                              {t('tabs.modules')} {week.modules.join(', ')}
                            </span>
                            <ChevronDown className="h-5 w-5 flex-shrink-0 text-ink transition-transform group-open:rotate-180" aria-hidden="true" />
                          </summary>
                          <div className="px-5 pb-5">
                            <p className="text-sm font-semibold text-muted">{t('modules.keySessionsLabel').replace(/:$/, '').toLowerCase().replace(/^./, (ch) => ch.toUpperCase())}</p>
                            <ul className="mt-3 space-y-2">
                              {week.sessions.map((s) => (
                                <li key={s} className="flex items-start gap-3 leading-relaxed">
                                  <span className="mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 bg-rust" aria-hidden="true"></span>
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Course facts */}
            <aside className="lg:col-span-4">
              <div className="border-t-4 border-ink bg-paper p-6 lg:sticky lg:top-[140px]">
                <dl className="divide-y divide-line">
                  <div className="pb-4">
                    <dt className="text-sm font-semibold text-muted">{t('sidebar.datesHeading')}</dt>
                    <dd className="mt-1 text-[1.0625rem] font-bold text-ink">{t('sidebar.datesValue')}</dd>
                    <dd className="text-[0.9375rem] text-muted">{t('sidebar.datesSubtext')}</dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-sm font-semibold text-muted">{t('sidebar.statusHeading')}</dt>
                    <dd className="mt-1 font-semibold text-success">{t('sidebar.statusValue')}</dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-sm font-semibold text-muted">{t('sidebar.formatHeading')}</dt>
                    <dd className="mt-1 text-text">{t('sidebar.formatValue')}</dd>
                  </div>
                  <div className="py-4">
                    <dt className="text-sm font-semibold text-muted">{t('sidebar.locationHeading')}</dt>
                    <dd className="mt-1 text-text">{t('sidebar.locationValue')}</dd>
                  </div>
                  <div className="pt-4">
                    <dt className="text-sm font-semibold text-muted">{t('sidebar.feesHeading')}</dt>
                    <dd className="mt-2">
                      <table className="w-full text-left">
                        <tbody>
                          <tr className="border-b border-line">
                            <th scope="row" className="py-2 pr-3 font-normal">
                              {t('sidebar.membersLabel')}
                              <span className="block text-sm font-semibold text-success">{t('sidebar.saveLabel', { percent: DISCOUNT_PERCENT })}</span>
                            </th>
                            <td className="py-2 text-right text-[1.125rem] font-bold tabular-nums text-ink">USD {MEMBER_PRICE}</td>
                          </tr>
                          <tr>
                            <th scope="row" className="py-2 pr-3 font-normal">{t('sidebar.nonMembersLabel')}</th>
                            <td className="py-2 text-right text-[1.125rem] font-bold tabular-nums text-ink">USD {NON_MEMBER_PRICE}</td>
                          </tr>
                        </tbody>
                      </table>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-col gap-3">
                  <button type="button" onClick={openApply} className={`${BTN} border-ink bg-ink text-white hover:border-rust hover:bg-rust`}>
                    {t('sidebar.applyNow')}
                  </button>
                  <a href={BROCHURE_URL} download className={`${BTN} border-ink bg-transparent text-ink hover:bg-ink hover:text-white`}>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span>{t('sidebar.downloadBrochure')}</span>
                    <span className="font-normal opacity-80">(PDF)</span>
                  </a>
                </div>
                <p className="mt-6 border-t border-line pt-5 text-[0.9375rem] text-muted">
                  {t('sidebar.questionsPrompt')} <TextLink to="/contact" className="font-semibold">{t('sidebar.contactUs')}</TextLink>
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MaritimeGovernanceCourse;
