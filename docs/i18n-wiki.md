# Internationalisation (i18n) — Developer Wiki

A practical reference for developers working on the i18n setup in this project. Covers next-intl, locale detection, translation files, localStorage, and the language toggle flow.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Translation Files](#2-translation-files)
3. [Locale Detection Logic](#3-locale-detection-logic)
4. [Language Toggle Flow](#4-language-toggle-flow)
5. [Using Translations in Components](#5-using-translations-in-components)
6. [localStorage — What It Is and How We Use It](#6-localstorage--what-it-is-and-how-we-use-it)
7. [Architecture & File Responsibilities](#7-architecture--file-responsibilities)

---

## 1. Overview

This project supports two locales:

| Code | Language |
|---|---|
| `en` | English (default) |
| `bm` | Bahasa Malaysia |

The implementation uses [next-intl](https://next-intl.dev/) **without URL-based routing** — the page URL stays `/` regardless of the chosen language. Locale is detected and persisted entirely on the client via `localStorage`.

---

## 2. Translation Files

All user-facing strings are stored in:

```
messages/
  en.json    ← English strings
  bm.json    ← Bahasa Malaysia strings
```

Both files must have **identical keys** — only the values differ.

Example structure:
```json
{
  "nav": {
    "about": "About",
    "schedule": "Schedule",
    "register": "Register Now"
  },
  "hero": {
    "tagline": "Malaysia's Premier Drone Education Competition"
  }
}
```

### Type Safety

`global.d.ts` registers the shape of `en.json` as the global message type:

```ts
import en from './messages/en.json'
type Messages = typeof en

declare global {
  interface IntlMessages extends Messages {}
}
```

This means TypeScript knows every valid translation key. If you call `t('nav.typo')` with a key that doesn't exist, TypeScript errors immediately at compile time — no silent `undefined` at runtime.

### Adding New Strings

1. Add the key + English value to `messages/en.json`
2. Add the same key + Bahasa Malaysia value to `messages/bm.json`
3. TypeScript will error anywhere you forgot to add the key to `bm.json`

---

## 3. Locale Detection Logic

When the page first loads, `lib/locale.ts → detectLocale()` runs this logic:

```
1. Read localStorage key "dec4ir_locale"
      ↓ found a valid value ("en" or "bm")? → use it
      ↓ not set or invalid?
2. Check navigator.language
      ↓ starts with "ms" (e.g. "ms-MY")? → use "bm"
      ↓ anything else?
3. Fall back to "en"
```

The result is stored back into `localStorage` so future visits skip steps 2–3.

### Code

```ts
// lib/locale.ts
export function detectLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE   // server guard
  const stored = localStorage.getItem(STORAGE_KEY) as Locale
  if (stored && LOCALES.includes(stored)) return stored
  if (navigator.language.toLowerCase().startsWith('ms')) return 'bm'
  return DEFAULT_LOCALE
}
```

### The `typeof window === 'undefined'` Guard

Next.js renders components on the **server** first, where `window` and `localStorage` don't exist. Without this guard the server render would crash. The guard returns `'en'` on the server; the real detection runs in the browser via `useEffect` inside `LocaleProvider`.

---

## 4. Language Toggle Flow

When the user clicks the EN/BM button in the Navbar:

```
User clicks toggle
      ↓
Navbar calls setLocale('bm')     ← from useLocale() context
      ↓
LocaleProvider.setLocale() runs
      ├── setLocaleState('bm')   → React re-renders entire tree in Bahasa Malaysia
      └── saveLocale('bm')       → writes "bm" to localStorage
```

No page reload. No URL change. The whole site re-renders client-side with new language strings, and the choice persists on the next visit.

### `saveLocale`

```ts
// lib/locale.ts
export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, locale)
}
```

---

## 5. Using Translations in Components

Import and call `useTranslations()` with the namespace (top-level key in your JSON):

```tsx
import { useTranslations } from 'next-intl'

export default function Navbar() {
  const t = useTranslations('nav')
  return (
    <nav>
      <a href="#about">{t('about')}</a>
      <a href="#schedule">{t('schedule')}</a>
    </nav>
  )
}
```

`t('about')` returns `"About"` in English or `"Tentang"` in Bahasa Malaysia — whichever locale is currently active.

### Accessing the Current Locale

To read or change the current locale directly (e.g. in the language toggle button):

```tsx
'use client'

import { useLocale } from '@/components/providers/LocaleProvider'

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  return (
    <button onClick={() => setLocale(locale === 'en' ? 'bm' : 'en')}>
      {locale === 'en' ? 'BM' : 'EN'}
    </button>
  )
}
```

`useLocale()` is a thin wrapper around React Context — it reads from `LocaleProvider` which sits at the root of the app.

---

## 6. localStorage — What It Is and How We Use It

### What Is localStorage?

`localStorage` is a browser API that saves small pieces of text data **on the user's own device**. It is:

- **Local only** — never sent to any server
- **Persistent** — survives tab closes and browser restarts
- **Domain-scoped** — only the site that wrote it can read it
- **Cleared** when the user clears browser/site data

It is a simple key-value store where both key and value are strings:

```ts
localStorage.setItem('key', 'value')   // write
localStorage.getItem('key')            // read → 'value' or null
localStorage.removeItem('key')         // delete
```

### How This Project Uses It

One key is used: `"dec4ir_locale"`. Value is either `"en"` or `"bm"`.

| Action | Where | Operation |
|---|---|---|
| Page load — detect saved language | `lib/locale.ts → detectLocale()` | `getItem('dec4ir_locale')` |
| User clicks language toggle | `lib/locale.ts → saveLocale()` | `setItem('dec4ir_locale', locale)` |

### Comparison with Other Storage Options

| | Who stores it | Sent to server? | Persists after close? |
|---|---|---|---|
| `localStorage` | Browser | No | Yes |
| `sessionStorage` | Browser | No | No (cleared on tab close) |
| Cookie | Browser | Yes (on every request) | Depends on expiry |
| Server session | Server | N/A | Depends on config |

This project uses `localStorage` — simplest option, zero backend required, and the preference persists on that device indefinitely.

---

## 7. Architecture & File Responsibilities

```
lib/locale.ts
  detectLocale()       Reads localStorage → navigator.language → fallback "en"
  saveLocale()         Writes chosen locale to localStorage
  Locale type          'en' | 'bm'
  LOCALES              ['en', 'bm']
  DEFAULT_LOCALE       'en'

components/providers/LocaleProvider.tsx
  LocaleProvider       React Context provider — holds locale state, exposes setLocale()
  useLocale()          Hook to read locale + setLocale from any component

messages/en.json       English translation strings (source of truth for key shape)
messages/bm.json       Bahasa Malaysia translation strings (must mirror en.json keys)

global.d.ts            Registers en.json shape as the global IntlMessages type
                       → makes all translation keys type-checked
```

### Data Flow Diagram

```
Page load
  │
  └── LocaleProvider mounts
            │
            └── useEffect → detectLocale()
                    │
                    ├── localStorage("dec4ir_locale") found? → use it
                    ├── navigator.language starts "ms"?      → "bm"
                    └── fallback                             → "en"
                    │
                    └── setLocaleState(result)
                              │
                              └── NextIntlClientProvider receives locale + messages
                                        │
                                        └── All components render in correct language


User clicks EN/BM toggle
  │
  └── setLocale(next)
          ├── setLocaleState(next)  → React re-renders with new strings
          └── saveLocale(next)      → localStorage updated for next visit
```
