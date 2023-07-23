import NavBar from "@/Components/NavBar/NavBar"

export const metadata = {
  title: 'Stock',
  description: 'Momin Food Products',
}


export default function StockLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  
    return (
        <div className='bg-base-200 text-black'>
            <NavBar/>
            {children}
        </div>
    )
  }