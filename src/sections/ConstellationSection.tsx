import { SectionHeading } from '@/components/SectionHeading'
import { Parallax } from '@/components/Parallax'
import { Constellation } from '@/components/constellation/Constellation'

export function ConstellationSection() {
  return (
    <section id="constelacion" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <SectionHeading
        index="02"
        eyebrow="La constelación"
        title="Un sistema de productos, una sola persona detrás."
        description="Cada nodo es un producto o servicio real. Están conectados porque comparten dominio, decisiones y evolución."
      />
      <div className="mt-12">
        <Parallax from={24} to={-24}>
          <Constellation />
        </Parallax>
      </div>
    </section>
  )
}
