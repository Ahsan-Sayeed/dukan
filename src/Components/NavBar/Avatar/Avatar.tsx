"use client"
import { AuthContext } from '@/app/Context/store'
import React, { useContext, useEffect, useState } from 'react'

type Props = {}

const Avatar = (props: Props) => {

    const { logOut,users } = useContext(AuthContext);
    const [email,setEmail] = useState<string | null>('');

    const handleSignOut = () => {
        logOut?.().then(() => {
            console.log('log out success');
        })
            .catch((error: string) => {
                alert('something went wrong');
            })
    }

    useEffect(() => {
        if (users && users?.uid) {
            setEmail(users?.email);
        }

    }, [users])

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg border border-accent bg-base-100 rounded-box w-52">
                <li>
                    {/* <a className="justify-between text-black my-2">Profile</a> */}
                </li>
                <span className='text-black text-xs'>{email}</span>
                {/* <li><a className='text-black'>Settings</a></li> */}
                <li><a className='border border-primary text-black my-2' onClick={handleSignOut}>Logout</a></li>
            </ul>
        </div>
    )
}

export default Avatar