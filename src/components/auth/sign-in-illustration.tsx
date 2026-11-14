/** Decorative two-people panel for the sign-in page. */
export function SignInIllustration() {
  return (
    <svg
      viewBox="0 0 480 560"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      role="img"
      aria-label="Two people connecting"
    >
      <title>Two people connecting</title>

      {/* organic blobs */}
      <ellipse cx="330" cy="170" rx="180" ry="160" fill="#ddd6fe" opacity="0.55" />
      <ellipse cx="140" cy="430" rx="200" ry="170" fill="#c7d2fe" opacity="0.45" />
      <ellipse cx="410" cy="470" rx="150" ry="130" fill="#ddd6fe" opacity="0.5" />
      <ellipse cx="90" cy="120" rx="70" ry="60" fill="#c4b5fd" opacity="0.4" />
      <circle cx="400" cy="300" r="24" fill="#a5b4fc" opacity="0.45" />
      <circle cx="180" cy="240" r="14" fill="#c4b5fd" opacity="0.5" />

      {/* back person (periwinkle) */}
      <circle cx="200" cy="220" r="42" fill="#818cf8" />
      <circle cx="200" cy="220" r="16" fill="#dbe2ff" />
      <path d="M140 375c0-60 27-100 60-100s60 40 60 100z" fill="#7c6cf0" />

      {/* front person (navy) */}
      <circle cx="300" cy="255" r="48" fill="#2f2a72" />
      <circle cx="300" cy="255" r="18" fill="#4c4694" />
      <path d="M228 435c0-68 32-114 72-114s72 46 72 114z" fill="#2f2a72" />
    </svg>
  )
}
