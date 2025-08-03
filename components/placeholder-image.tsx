interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
  alt?: string
}

export function PlaceholderImage({ width, height, text, className, alt }: PlaceholderImageProps) {
  const displayText = text || `${width}x${height}`
  const imageUrl = `/placeholder.svg?height=${height}&width=${width}&text=${encodeURIComponent(displayText)}`

  return (
    <img
      src={imageUrl || "/placeholder.svg"}
      alt={alt || `Placeholder image ${displayText}`}
      className={className}
      width={width}
      height={height}
    />
  )
}
