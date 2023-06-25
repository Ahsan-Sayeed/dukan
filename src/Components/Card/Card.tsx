import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const icons = {
    upgrade: <svg style={{color:"green"}} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19z"></path></svg>,
    downgrade: <svg style={{color:"red"}} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
}

const Card = (props: Props) => {
    const pathname = usePathname();
    return (
        <div className={`stats shadow mx-2 bg-base-100 shadow-xl flex border h-52 ${pathname==='/users'?"w-full":"w-56"}`}>
            <div className="card-body">
                <h2 className="stat-title">Card title!</h2>
                <div className='flex items-center'>
                    <p className='stat-value text-secondary'>12</p>
                    {pathname === '/users' && <div className="radial-progress text-primary" style={{ "--value": 70 }}>70%</div>}
                </div>
                <div className="card-actions flex flex-col">
                    <div className="stat-desc flex items-center">
                        {icons.upgrade}
                         <span className='mx-2'> 25% </span>
                    </div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
            </div>
        </div>
    )
}

export default Card