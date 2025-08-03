import type React from "react"
interface PresentationCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function PresentationCard({ title, description, icon, children, className }: PresentationCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 border border-gray-200 ${className}`}>
      <div className="flex items-center mb-4">
        {icon && <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}
