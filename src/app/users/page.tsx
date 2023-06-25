"use client"
import Drawer from '@/Components/Drawer/Drawer'
import React from 'react'
import UsersContainer from './(users_layout)/UsersContainer/UsersContainer'

type Props = {}

const users = (props: Props) => {
  return (
    <div className='bg-base-200 text-black'>
      <Drawer>
        <div className='w-full'>
          <h1 className='text-4xl subpixel-antialiased font-sans font-thin m-5'>Users</h1>
          <UsersContainer />
        </div>
      </Drawer>
    </div>
  )
}

export default users