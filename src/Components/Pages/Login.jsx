import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Container, TextLink } from '../ui/Editorial';
import { Field, ErrorSummary, inputClass, describedBy } from '../ui/Form';

/*
  GOV.UK-style two-step sign-in: Membership ID, then a 6-digit security code
  in a single field (so phones can autofill it from the email or SMS).
*/
const Login = () => {
  const { t } = useTranslation('login');
  const navigate = useNavigate();
  const location = useLocation();
  const { sendOTP, login } = useAuth();

  const [step, setStep] = useState('id'); // 'id' | 'otp'
  const [membershipId, setMembershipId] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRef = useRef(null);
  const from = location.state?.from?.pathname || '/dashboard';

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    setError('');
    if (!membershipId.trim()) { setError(t('errors.membershipIdRequired')); return; }
    setLoading(true);
    const result = await sendOTP({ membershipId: membershipId.trim() });
    setLoading(false);
    if (result.success) {
      setMaskedEmail(result.maskedEmail);
      setStep('otp');
      setResendCooldown(60);
      setTimeout(() => otpRef.current?.focus(), 100);
    } else {
      setError(result.error);
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
    setError('');
  };

  const handleVerifyOTP = async (e) => {
    e?.preventDefault();
    if (otp.length < 6) { setError(t('errors.otpIncomplete')); return; }
    setLoading(true);
    setError('');
    const result = await login({ membershipId: membershipId.trim(), otp });
    setLoading(false);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
      setOtp('');
    }
  };

  const changeId = () => {
    setStep('id');
    setOtp('');
    setError('');
    setTimeout(() => document.getElementById('login-membershipId')?.focus(), 50);
  };

  // Each step has one field, so any error belongs to that field.
  const fieldId = step === 'id' ? 'login-membershipId' : 'login-otp';
  const errPrefix = t('errorPrefix');

  const primaryButton =
    'focus-ring inline-flex items-center justify-center rounded-[2px] border-b-2 border-ink-deep bg-ink px-6 py-3 text-[1.0625rem] font-semibold text-white transition-colors hover:bg-rust disabled:cursor-not-allowed disabled:opacity-60';

  return (
    <div className="w-full bg-paper font-body text-text">
      <Container className="pb-20 pt-[120px] md:pb-28 md:pt-[150px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="max-w-xl border border-line bg-white px-6 py-8 md:px-10 md:py-10">
              {error && (
                <div className="mb-8">
                  <ErrorSummary title={t('errorSummary')} items={[{ id: fieldId, message: error }]} />
                </div>
              )}

              {step === 'id' && (
                <form onSubmit={handleSendOTP} noValidate>
                  <h1 className="heading-display text-[2.25rem] md:text-[2.75rem]">{t('heading')}</h1>
                  <p className="mt-3 text-[1.1875rem] leading-relaxed text-muted">{t('subtitle.enterId')}</p>

                  <div className="mt-8">
                    <Field id="login-membershipId" label={t('step1.label')} hint={t('step1.helpText')} error={error || undefined} errorPrefix={errPrefix}>
                      <input
                        id="login-membershipId"
                        type="text"
                        value={membershipId}
                        onChange={(e) => { setMembershipId(e.target.value); setError(''); }}
                        placeholder={t('step1.placeholder')}
                        autoComplete="username"
                        autoCapitalize="characters"
                        spellCheck="false"
                        disabled={loading}
                        aria-invalid={!!error}
                        aria-describedby={describedBy('login-membershipId', { hint: true, error })}
                        className={inputClass(!!error, 'max-w-sm font-mono tracking-wide placeholder:font-body placeholder:tracking-normal placeholder:text-muted/70')}
                      />
                    </Field>
                  </div>

                  <button type="submit" disabled={loading} className={`${primaryButton} mt-8`}>
                    {loading ? t('step1.submitLoading') : t('step1.submitIdle')}
                  </button>
                </form>
              )}

              {step === 'otp' && (
                <form onSubmit={handleVerifyOTP} noValidate>
                  <h1 className="heading-display text-[2.25rem] md:text-[2.75rem]">{t('step2.title')}</h1>
                  <p className="mt-3 text-[1.1875rem] leading-relaxed text-text">
                    {t('step2.codeSentToPrefix')} <strong className="font-bold">{maskedEmail}</strong>
                  </p>

                  <div className="mt-8">
                    <Field id="login-otp" label={t('step2.codeLabel')} hint={t('step2.codeHint')} error={error || undefined} errorPrefix={errPrefix}>
                      <input
                        ref={otpRef}
                        id="login-otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={otp}
                        onChange={handleOtpChange}
                        disabled={loading}
                        spellCheck="false"
                        aria-invalid={!!error}
                        aria-describedby={describedBy('login-otp', { hint: true, error })}
                        className={inputClass(!!error, 'max-w-[11rem] font-mono text-[1.5rem] tracking-[0.35em]')}
                      />
                    </Field>
                  </div>

                  <button type="submit" disabled={loading} className={`${primaryButton} mt-8`}>
                    {loading ? t('step2.verifyLoading') : t('step2.verifyIdle')}
                  </button>

                  <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 text-[1.0625rem]">
                    <li>
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={resendCooldown > 0 || loading}
                        className="focus-ring font-semibold text-ink underline underline-offset-4 hover:text-rust disabled:cursor-not-allowed disabled:text-muted disabled:no-underline"
                      >
                        {resendCooldown > 0 ? t('step2.resendCooldown', { seconds: resendCooldown }) : t('step2.resendIdle')}
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={changeId}
                        className="focus-ring font-semibold text-ink underline underline-offset-4 hover:text-rust"
                      >
                        {t('step2.changeId')}
                      </button>
                    </li>
                  </ul>
                </form>
              )}

              <details className="mt-10 border-t border-line pt-6">
                <summary className="focus-ring cursor-pointer text-[1.0625rem] font-semibold text-ink underline underline-offset-4 hover:text-rust">
                  {t('help.summary')}
                </summary>
                <div className="mt-4 border-l-[5px] border-line pl-4">
                  <p className="leading-relaxed text-text">{t('help.body')}</p>
                  <TextLink to="/contact" className="mt-3 font-semibold">{t('help.contact')}</TextLink>
                </div>
              </details>
            </div>
          </div>

          {/* Not a member yet */}
          <aside className="lg:col-span-4 lg:col-start-9" aria-labelledby="login-join">
            <div className="border-t-4 border-ink pt-6">
              <h2 id="login-join" className="text-[1.375rem] font-bold leading-snug text-ink">{t('footer.notAMember')}</h2>
              <p className="mt-3 leading-relaxed text-muted">{t('footer.intro')}</p>
              <TextLink to="/membership" className="mt-5 font-semibold">{t('footer.joinLink')}</TextLink>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default Login;
