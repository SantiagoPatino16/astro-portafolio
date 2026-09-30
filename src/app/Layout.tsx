import { Outlet } from 'react-router-dom'
import { ThemeProvider } from '@/app/ThemeProvider'
import { RendererProvider } from '@/app/RendererProvider'
import { ScrollToTop } from '@/app/ScrollToTop'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Starfield } from '@/components/Starfield'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function Layout() {
  return (
    <ThemeProvider>
      <RendererProvider>
        <ScrollToTop />
        <div className="relative flex min-h-screen flex-col bg-void text-ink">
          <Starfield />
          <ScrollProgress />
          <Header />
          <main className="relative z-10 flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </RendererProvider>
    </ThemeProvider>
  )
}
