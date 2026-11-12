import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

/*
  GOV.UK-style form building blocks: labels above fields, optional fields
  marked as optional, an error summary that links to each problem, and an
  inline error on each field with a red bar on its left.
*/

export const inputClass = (hasError, extra = '') =>
  'block w-full rounded-[2px] border-2 bg-white px-3 py-2.5 text-[1.0625rem] text-text ' +
  'focus:border-text focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-sand ' +
  'disabled:bg-paper disabled:text-muted ' +
  (hasError ? 'border-error ' : 'border-text ') +
  extra;

// aria-describedby value for a field with an optional hint and error.
export const describedBy = (id, { hint, error } = {}) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

export const Field = ({ id, label, hint, optionalText, error, errorPrefix = 'Error:', children }) => (
  <div className={error ? 'border-l-[5px] border-error pl-4' : ''}>
    <label htmlFor={id} className="block text-[1.0625rem] font-bold text-text">
      {label}
      {optionalText && <span className="font-normal text-muted"> {optionalText}</span>}
    </label>
    {hint && <p id={`${id}-hint`} className="mt-1 text-[0.9375rem] text-muted">{hint}</p>}
    {error && (
      <p id={`${id}-error`} className="mt-1 text-[1.0625rem] font-bold text-error">
        <span className="sr-only">{errorPrefix} </span>{error}
      </p>
    )}
    <div className="mt-2">{children}</div>
  </div>
);

/*
  Error summary: `items` is a list of { id, message } where id is the field's id.
  Focus moves here whenever the list changes and is not empty.
*/
export const ErrorSummary = ({ title, items }) => {
  const ref = useRef(null);
  const key = items.map((i) => i.id).join('|');

  useEffect(() => {
    if (items.length) ref.current?.focus();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!items.length) return null;

  const jump = (event, id) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ block: 'center' });
      el.focus();
    }
  };

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      className="border-[5px] border-error p-5 focus:outline focus:outline-[3px] focus:outline-sand"
    >
      <h2 id="error-summary-title" className="text-[1.25rem] font-bold text-text">{title}</h2>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => jump(e, item.id)}
              className="font-bold text-error underline underline-offset-2 hover:decoration-2"
            >
              {item.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

/*
  Modal dialog: dialog role, Escape and backdrop close (unless `locked`),
  focus moved inside on open and restored on close, page scroll locked.
*/
export const Dialog = ({ onClose, labelledBy, closeLabel = 'Close', locked = false, className = '', children }) => {
  const closeRef = useRef(null);
  const lockedRef = useRef(locked);
  lockedRef.current = locked;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previous = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape' && !lockedRef.current) onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      if (previous && previous.focus) previous.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-center overflow-y-auto bg-ink-deep/70 p-4 md:p-8"
      onMouseDown={(e) => { if (e.target === e.currentTarget && !locked) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`relative my-auto w-full rounded-[2px] bg-white font-body text-text ${className}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          disabled={locked}
          aria-label={closeLabel}
          className="focus-ring absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-[2px] text-muted transition-colors hover:bg-paper hover:text-ink disabled:opacity-40"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
};
