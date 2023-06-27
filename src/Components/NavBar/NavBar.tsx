import React from 'react'
import SearchBar from './SearchBar/SearchBar'
import NotificationBar from './NotificationBar/NotificationBar'
import Avatar from './Avatar/Avatar'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <div className="navbar">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">MFP</a>
      </div>
      <div className="flex-none">
          {/* <SearchBar /> */}
          {/* <NotificationBar /> */}
          <Avatar/>
      </div>
    </div>
  )
}

export default NavBar