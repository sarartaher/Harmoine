/** Decorative high-five celebration panel for the sign-up page. */
export function SignUpIllustration() {
  return (
    <svg
      viewBox="0 0 480 560"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      role="img"
      aria-label="A group of people celebrating with a high five"
    >
      <title>A group of people celebrating with a high five</title>

      {/* soft blobs */}
      <ellipse cx="300" cy="190" rx="210" ry="185" fill="#e0dcff" opacity="0.75" />
      <ellipse cx="130" cy="440" rx="185" ry="155" fill="#ddd6fe" opacity="0.6" />
      <ellipse cx="420" cy="430" rx="140" ry="160" fill="#c7d2fe" opacity="0.45" />

      {/* plant, bottom-left */}
      <path d="M58 555C34 485 62 425 108 400c8 66-16 122-50 155z" fill="#34d399" />
      <path d="M72 558c14-72 66-108 122-102-20 58-64 96-122 102z" fill="#10b981" />
      <path d="M66 558c-2-58 24-104 66-126" stroke="#059669" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* confetti */}
      <circle cx="128" cy="165" r="9" fill="#a78bfa" />
      <circle cx="352" cy="140" r="8" fill="#2dd4bf" />
      <circle cx="185" cy="95" r="7" fill="#fbbf24" />
      <circle cx="390" cy="255" r="7" fill="#c084fc" />
      <rect x="300" y="70" width="14" height="14" rx="3" fill="#a78bfa" transform="rotate(25 307 77)" />
      <rect x="95" y="255" width="13" height="13" rx="3" fill="#2dd4bf" transform="rotate(-20 101 261)" />
      <path d="M365 195l10-14M375 195l-10-14" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
      <path d="M150 110l10-14M160 110l-10-14" stroke="#c084fc" strokeWidth="5" strokeLinecap="round" />

      {/* left person (teal) */}
      <path d="M75 430c0-52 24-86 55-86s55 34 55 86v130H75z" fill="#14b8a6" />
      <circle cx="130" cy="318" r="32" fill="#f2c9a4" />
      <path d="M98 318a32 32 0 0 1 64 0z" fill="#2f3a72" />
      <path d="M100 445 218 148M162 442l62-272" stroke="#14b8a6" strokeWidth="17" strokeLinecap="round" fill="none" />

      {/* right person (purple) */}
      <path d="M315 415c0-52 24-86 55-86s55 34 55 86v145H315z" fill="#7c6cf0" />
      <circle cx="370" cy="300" r="32" fill="#e8b48c" />
      <path d="M338 300a32 32 0 0 1 64 0z" fill="#1f2955" />
      <path d="M338 432 244 140M400 430l-44-268" stroke="#7c6cf0" strokeWidth="17" strokeLinecap="round" fill="none" />

      {/* front center person (navy) */}
      <path d="M185 560c0-64 29-106 65-106s65 42 65 106z" fill="#2f2a72" />
      <circle cx="250" cy="418" r="36" fill="#f2c9a4" />
      <path d="M214 418a36 36 0 0 1 72 0z" fill="#111833" />
      <path d="M214 520 236 168M286 518l-22-330" stroke="#2f2a72" strokeWidth="18" strokeLinecap="round" fill="none" />

      {/* hands meeting at the high-five point */}
      <circle cx="232" cy="150" r="13" fill="#f2c9a4" />
      <circle cx="262" cy="145" r="13" fill="#e8b48c" />
      <circle cx="224" cy="145" r="12" fill="#e8b48c" />
      <circle cx="264" cy="170" r="12" fill="#f2c9a4" />
      <circle cx="250" cy="130" r="13" fill="#f2c9a4" />
      <path d="M250 88v-24M212 100l-14-18M290 100l14-18" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}
