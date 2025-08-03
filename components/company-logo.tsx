interface CompanyLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

export function CompanyLogo({ size = "md", className, showText = true }: CompanyLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src="/images/prana-logo-transparent.png"
        alt="Prana Argentum Logo"
        className={`${sizeClasses[size]} object-contain`}
        style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))" }}
      />
      {showText && <span className={`${textSizes[size]} font-bold text-prana-navy`}>Prana Argentum</span>}
    </div>
  )
}
