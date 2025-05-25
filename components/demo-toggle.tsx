'use client'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useDemoContext } from '@/contexts/demo-context'

export function DemoToggle() {
  const { isDemoMode, toggleDemoMode } = useDemoContext()

  return (
    <div className="flex items-center space-x-2">
      <Switch id="demo-mode" checked={isDemoMode} onCheckedChange={toggleDemoMode} />
      <Label htmlFor="demo-mode" className="text-sm text-neutral-600">
        Demo Mode
      </Label>
    </div>
  )
}
