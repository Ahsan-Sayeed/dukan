import React, {useState} from 'react'
import UserList from './UserList/UserList'
import UserInfo from './UserInfo/UserInfo'

type Props = {
    data: {
        name: string,
        position: string,
        email: string,
        phone: string,
        isActive: string
    }[]
}

const UserTable = ({data}: Props) => {
    const [selectUser,setUser] = useState(JSON.parse(localStorage.getItem("user")!)||0);
    localStorage.setItem("user",JSON.stringify(selectUser));
    return (
        <div className='lg:flex text-black ms-2'>
            <UserList data={data} setUser={setUser} selectUser={selectUser}/>
            <UserInfo data={data} selectUser={selectUser}/>
        </div>
    )
}

export default UserTable