import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import NotificationBar from './NotificationBar/NotificationBar'
import Avatar from './Avatar/Avatar'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className="navbar glass shadow-xl">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <img src="https://i.ibb.co/YZRt7kQ/momin-logo.png" alt="" height={3} width={30}/>
        </a>
      </div>
      <div className="flex-none">
        {/* <SearchBar /> */}
        {/* <NotificationBar /> */}
        <Avatar />
      </div>
    </div>
  )
}

export default NavBar