interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  light?: boolean
}

export default function SectionHeading({ title, subtitle, className = '', light = false }: SectionHeadingProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl mx-auto ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
