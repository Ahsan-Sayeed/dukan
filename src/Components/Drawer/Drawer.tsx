import React from 'react'
import NavRoute from './NavRoute/NavRoute'

type Props = {
    children: React.ReactNode
}



function Drawer({ children }: Props) {
    return (

        <div className="drawer min-h-screen border">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-row">
                {/* Navbar */}
                <div className="border shadow-xl glass border-0 border-e-2 rounded pt-2 lg:pt-5 lg:pe-2">

                    <div className="flex-none lg:hidden menu menu-vertical">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                        <NavRoute showName={false} />
                    </div>

                    {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}

                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-vertical">
                            {/* Navbar menu content here */}
                            <NavRoute showName={true} />
                        </ul>
                    </div>

                </div>
                {/* Page content here */}
                {children}
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60 bg-base-200 absolute top-32">
                    {/* Sidebar content here */}
                    <NavRoute showName={true} />
                </ul>
            </div>
        </div>

    )
}

export default Drawer