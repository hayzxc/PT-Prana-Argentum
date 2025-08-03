interface CertificatePreviewProps {
  certificateName: string
  className?: string
  serviceType?: string
  location?: string
  description?: string
}

export function CertificatePreview({
  certificateName,
  className,
  serviceType,
  location,
  description,
}: CertificatePreviewProps) {
  return (
    <div
      className={`relative bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6 ${className}`}
    >
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800">SURVEY CERTIFICATE</h3>
          <p className="text-xs text-blue-600 font-semibold">PRANA ARGENTUM</p>
        </div>

        <div className="border-t border-b border-gray-300 py-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">This is to certify that</p>
          <p className="text-xl font-bold text-gray-800 mb-2">PT. Logistik Nusantara</p>
          <p className="text-sm text-gray-600 mb-2">has completed</p>
          <p className="text-lg font-semibold text-blue-600">{certificateName}</p>

          {location && (
            <div className="mt-3 text-sm">
              <p className="text-gray-600">Location:</p>
              <p className="font-bold text-gray-800">{location}</p>
            </div>
          )}

          {description && (
            <div className="mt-3 text-sm">
              <p className="text-gray-600">Service:</p>
              <p className="font-medium text-gray-800">{description}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <div>
            <p>Date: {new Date().toLocaleDateString("en-US")}</p>
            <p className="text-green-600 font-semibold">Certified</p>
          </div>
          <div className="text-right">
            <p>Prana Argentum</p>
            <p>Surveyor Services</p>
          </div>
        </div>

        <div className="absolute top-2 right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-green-800" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}
