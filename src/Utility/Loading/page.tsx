"use client"
import { AuthContext } from '@/app/Context/store'
import React, { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode,
}

const Loading = ({ children }: Props) => {
  const { loading, users }: { loading: boolean, user: object | undefined } = useContext(AuthContext);
  const pathname = usePathname();

  // console.log(users);
  const router = useRouter();


  if (loading) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <span className="loading" style={{ border: "30px solid green" }}></span>
      </div>
    )
  }

  if (users && users.uid) {
    router.push(pathname!=='/'?pathname:'/dashboard')
    return (
      <>{children}</>
    )
  }
  else {
    router.push('/');
    return <>{children}</>;

  }
}

export default Loading