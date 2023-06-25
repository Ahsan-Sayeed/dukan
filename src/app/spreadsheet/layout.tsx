import NavBar from "@/Components/NavBar/NavBar"

export default function UsersLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  
    return (
        <div>
            <NavBar/>
            {children}
        </div>
    )
  }