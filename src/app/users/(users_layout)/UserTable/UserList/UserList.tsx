import React from 'react'

type Props = {
    data: {
        name: string,
        position: string,
        email: string,
        phone: string,
        isActive: string
    }[],
    setUser: (args:number)=> void,
    selectUser:number
}

const UserList = ({data,setUser,selectUser}: Props) => {
    return (
        <div className="overflow-x-auto bg-base-100 border rounded-xl shadow-xl w-full" style={{ height: "400px" }}>
            <table className="table">
                {/* head */}
                <thead className='bg-neutral text-white'>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Active Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}

                    {
                        data.map((v,idx) => {
                            return (
                                <tr key={idx} className={`hover:bg-base-300 ${data.indexOf(v)===selectUser&&"bg-base-300"}`} onClick={()=>setUser(data.indexOf(v))}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{v.name}</div>
                                                <div className="text-sm opacity-50">{v.position}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {v.email}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{v.phone}</span>
                                    </td>
                                    <td>{v.isActive}</td>
                                    <td></td>
                                </tr>)
                        })
                    }
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Total User: <span className='text-black'>{data.length}</span></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default UserList