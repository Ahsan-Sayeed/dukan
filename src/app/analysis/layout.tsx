import NavBar from "@/Components/NavBar/NavBar"

export const metadata = {
  title: 'Analysis',
  description: 'Momin Food Products',
}


export default function UsersLayout({
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