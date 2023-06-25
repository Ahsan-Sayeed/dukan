import Card from '@/Components/Card/Card'
import React from 'react'
import UserTable from '../UserTable/UserTable'

type Props = {}

const data = [
    {
        name: "Hart Hagerty",
        position: "Manager",
        email: "asdf@gmail.com",
        phone: "+880154465464",
        isActive: "online"
    },
    {
        name: "1Hart Hagerty",
        position: "Manager",
        email: "asdf@gmail.com",
        phone: "+880154465464",
        isActive: "online"
    },
    {
        name: "2Hart Hagerty",
        position: "Manager",
        email: "asdf@gmail.com",
        phone: "+880154465464",
        isActive: "online"
    },
    {
        name: "3Hart Hagerty",
        position: "Manager",
        email: "asdf@gmail.com",
        phone: "+880154465464",
        isActive: "online"
    },
]

const UsersContainer = (props: Props) => {
    return (
        <div className='mx-5 my-2'>
            <div className='lg:flex justify-center mt-5 '>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
            </div>

            <div className='my-10'>
                <UserTable data={data}/>
            </div>
        </div>
    )
}

export default UsersContainer