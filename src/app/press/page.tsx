'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { luxe } from '@/components/shared/luxe-styles'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press"
      description="Logos, product captures, and storylines for journalists covering our PDF + profile studio."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className={luxe.card}>
          <CardContent className="space-y-4 p-7">
            <p className={luxe.eyebrow}>Media desk</p>
            <h2 className={`font-display text-xl font-semibold ${luxe.ink}`}>Press kit</h2>
            <p className={`text-sm leading-relaxed ${luxe.muted}`}>
              Download bronze-on-cream brand marks, UI captures of the library and profile surfaces, and talking points
              about why teams consolidate PDFs here.
            </p>
            <div className="grid gap-3">
              {mockPressAssets.map((asset) => (
                <div key={asset.id} className={luxe.soft}>
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className={`text-sm font-medium ${luxe.ink}`}>{asset.title}</p>
                      <p className={`text-xs ${luxe.muted}`}>{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="border border-[#e5d9cf] bg-[#f3ebe4] text-[#5c4b42]">{asset.fileType}</Badge>
                      <Button size="sm" variant="outline" className={luxe.btnOutline} onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className={luxe.btnPrimary}
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className={`${luxe.card} transition-transform hover:-translate-y-1`}>
              <CardContent className="p-6">
                <div className={`text-xs font-semibold uppercase tracking-wide ${luxe.muted}`}>{item.outlet}</div>
                <p className={`mt-2 text-sm font-medium ${luxe.ink}`}>{item.headline}</p>
                <p className={`mt-2 text-xs ${luxe.muted}`}>{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-[#e5d9cf] bg-[#faf6f2]">
              <Image
                src={activeAsset.previewUrl}
                alt={activeAsset.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className={`text-sm ${luxe.muted}`}>{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className={luxe.btnOutline} onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className={luxe.btnPrimary}
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
