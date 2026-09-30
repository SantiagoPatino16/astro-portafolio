import { Core } from '@/sections/Core'
import { ConstellationSection } from '@/sections/ConstellationSection'
import { Method } from '@/sections/Method'
import { Systems } from '@/sections/Systems'
import { Capabilities } from '@/sections/Capabilities'
import { Services } from '@/sections/Services'
import { Contact } from '@/sections/Contact'

export function Home() {
  return (
    <>
      <Core />
      <ConstellationSection />
      <Method />
      <Systems />
      <Capabilities />
      <Services />
      <Contact />
    </>
  )
}
