import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { Home } from '@/routes/Home'
import { CaseStudyPage } from '@/routes/CaseStudyPage'
import { CVPage } from '@/routes/CVPage'
import { NotFound } from '@/routes/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'sistema/:id', element: <CaseStudyPage /> },
      { path: 'cv', element: <CVPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
