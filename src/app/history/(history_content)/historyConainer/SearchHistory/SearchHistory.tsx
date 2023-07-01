import React from 'react'

type Props = {
    setData: (args:string) => void
}

const SearchHistory = ({setData}: Props) => {
    return (
        <div className=" bg-base-100 mx-5 rounded-xl shadow-xl">
            <div className="form-control w-full text-black rounded-xl">
                <input type="text" placeholder="Search" className="input input-bordered w-full md:w-auto" onChange={(e)=>setData(e.target.value)}/>
            </div>
        </div>
    )
}

export default SearchHistory