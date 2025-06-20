"use client"

import { Button } from "@/components/ui/button"

type BlogLayout = "image-scattered" | "image-top"

interface LayoutSelectionModalProps {
  isOpen: boolean
  selectedLayout: BlogLayout
  onLayoutChange: (layout: BlogLayout) => void
  onCancel: () => void
  onConfirm: () => void
}

export function LayoutSelectionModal({
  isOpen,
  selectedLayout,
  onLayoutChange,
  onCancel,
  onConfirm,
}: LayoutSelectionModalProps) {
  if (!isOpen) return null

  const LayoutOption = ({ layout, isSelected }: { layout: BlogLayout; isSelected: boolean }) => (
    <div className="relative cursor-pointer" onClick={() => onLayoutChange(layout)}>
      {/* Radio Button */}
      <div className="absolute -top-2 -left-2 z-10">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected ? "border-green-500 bg-green-500" : "border-gray-300 bg-white"
          }`}
        >
          {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
        </div>
      </div>

      {/* Layout Preview Card */}
      <div className="w-40 h-56 bg-white border-2 border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors">
        {layout === "image-scattered" ? (
          // Left layout - Images scattered throughout with text
          <div className="space-y-1">
            {/* Text lines at top */}
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>

            {/* Small image 1 */}
            <div className="w-6 h-4 bg-orange-300 rounded ml-auto"></div>

            {/* More text */}
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-4/5 h-1 bg-gray-400 rounded"></div>

            {/* Small image 2 */}
            <div className="w-6 h-4 bg-orange-300 rounded"></div>

            {/* More text */}
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>

            {/* Small image 3 */}
            <div className="w-6 h-4 bg-orange-300 rounded ml-auto"></div>

            {/* More text */}
            <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-4/5 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded"></div>

            {/* Small image 4 */}
            <div className="w-6 h-4 bg-orange-300 rounded"></div>

            {/* Final text lines */}
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-4/5 h-1 bg-gray-400 rounded"></div>
          </div>
        ) : (
          // Right layout - Large image at top, then text
          <div className="space-y-1">
            {/* Large hero image at top */}
            <div className="w-full h-12 bg-orange-300 rounded"></div>

            {/* Text content below */}
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-4/5 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded"></div>

            {/* Small image in content */}
            <div className="w-6 h-4 bg-orange-300 rounded ml-auto"></div>

            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-4/5 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-3/4 h-1 bg-gray-400 rounded"></div>
            <div className="w-full h-1 bg-gray-400 rounded"></div>
            <div className="w-2/3 h-1 bg-gray-400 rounded"></div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Choose Layout</h3>
          <p className="text-gray-600">Choose Layout for your blog</p>
        </div>

        {/* Layout Options */}
        <div className="flex justify-center gap-8 mb-8">
          <LayoutOption layout="image-scattered" isSelected={selectedLayout === "image-scattered"} />
          <LayoutOption layout="image-top" isSelected={selectedLayout === "image-top"} />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={onCancel}
            className="px-6 py-2 border-red-500 text-red-500 hover:bg-red-50"
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white">
            POST
          </Button>
        </div>
      </div>
    </div>
  )
}
