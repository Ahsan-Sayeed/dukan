"use client"
import { AuthContext } from '@/app/Context/store'
import React, { useContext, useEffect, useState } from 'react'

const icons = {
    logOut: <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M521.7 82c-152.5-.4-286.7 78.5-363.4 197.7-3.4 5.3.4 12.3 6.7 12.3h70.3c4.8 0 9.3-2.1 12.3-5.8 7-8.5 14.5-16.7 22.4-24.5 32.6-32.5 70.5-58.1 112.7-75.9 43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 32.6 32.5 58.1 70.4 76 112.5C865.7 417.8 875 464.1 875 512c0 47.9-9.4 94.2-27.8 137.8-17.8 42.1-43.4 80-76 112.5s-70.5 58.1-112.7 75.9A352.8 352.8 0 0 1 520.6 866c-47.9 0-94.3-9.4-137.9-27.8A353.84 353.84 0 0 1 270 762.3c-7.9-7.9-15.3-16.1-22.4-24.5-3-3.7-7.6-5.8-12.3-5.8H165c-6.3 0-10.2 7-6.7 12.3C234.9 863.2 368.5 942 520.6 942c236.2 0 428-190.1 430.4-425.6C953.4 277.1 761.3 82.6 521.7 82zM395.02 624v-76h-314c-4.4 0-8-3.6-8-8v-56c0-4.4 3.6-8 8-8h314v-76c0-6.7 7.8-10.5 13-6.3l141.9 112a8 8 0 0 1 0 12.6l-141.9 112c-5.2 4.1-13 .4-13-6.3z"></path></svg>
}

type Props = {}

const Avatar = (props: Props) => {

    const { logOut, users } = useContext(AuthContext);
    const [email, setEmail] = useState<string | null>('');

    const handleSignOut = () => {
        logOut?.().then(() => {
            console.log('log out success');
        })
            .catch((error: string) => {
                //something went wrong('something went wrong');
            })
    }

    useEffect(() => {
        if (users && users?.uid) {
            setEmail(users?.email);
        }

    }, [users])

    return (
        <div className="flex items-center">
            <label className="flex justify-center items-center btn btn-ghost btn-circle avatar tooltip tooltip-left" data-tip="Profile">
                <div className="w-10 rounded-full">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" />
                </div>
            </label>
            <label className="w-10 h-10 mx-2 rounded-full border border-black flex justify-center items-center border tooltip tooltip-left" data-tip="LOGOUT">
                <button className='text-black my-2 btn btn-ghost btn-circle avatar' onClick={handleSignOut}>{icons.logOut}</button>
            </label>
        </div>
    )
}

export default Avatar