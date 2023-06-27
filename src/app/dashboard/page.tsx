"use client"
import React from 'react'
// import { AuthContext } from '../Context/store'
import Drawer from '@/Components/Drawer/Drawer'
import DashboardContents from './(dashboard_layouts)/DashboardContents/DashboardContents'

type Props = {}

const page = (props: Props) => {
  // const context = useContext(AuthContext);
  // console.log(context);
  return (
    <div className='bg-base-200 text-black'>
      <Drawer>
        <div className='w-full'>
          <h1 className='text-4xl subpixel-antialiased font-sans font-thin m-5'>Dashboard</h1>
          <DashboardContents></DashboardContents>
        </div>
      </Drawer>
    </div>
  )
}

export default page;