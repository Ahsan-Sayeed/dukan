import NavBar from '@/Components/NavBar/NavBar'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
        <section className={inter.className} >
          <div>
            <NavBar/>
            {children}
          </div>
        </section>
  )
}
