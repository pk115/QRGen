'use client'

import { CONTENT_TYPES, ContentType } from '@/lib/qr-encoder'
import { useQRStore } from '@/store/qr-store'
import { cn } from '@/lib/utils'

export function ContentTypeSelector() {
  const { contentType, setContentType } = useQRStore()

  return (
    <div className="grid grid-cols-3 gap-2">
      {CONTENT_TYPES.map((ct) => (
        <button
          key={ct.type}
          onClick={() => setContentType(ct.type)}
          className={cn(
            'flex flex-col items-center gap-1 p-2.5 rounded-xl border text-center transition',
            contentType === ct.type
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-100 bg-white text-gray-600 hover:border-primary-200 hover:bg-primary-50/50'
          )}
        >
          <span className="text-xl">{ct.icon}</span>
          <span className="text-xs font-medium leading-tight">{ct.label}</span>
        </button>
      ))}
    </div>
  )
}
