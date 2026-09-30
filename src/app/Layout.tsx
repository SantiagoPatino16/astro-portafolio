import { Outlet } from 'react-router-dom'
import { RendererProvider } from '@/app/RendererProvider'
import { ScrollToTop } from '@/app/ScrollToTop'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function Layout() {
  return (
    <RendererProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-void text-ink">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </RendererProvider>
  )
}
