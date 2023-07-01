import NavBar from '@/Components/NavBar/NavBar'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'History',
    description: 'Momin Food Products',
  }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div className='bg-base-200 text-black'>
            <NavBar />
            {children}
        </div>
    )
}
