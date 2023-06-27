import React, { useEffect, useState } from 'react'

type Props = {
}

const icons = {
    edit: <svg className='text-primary' stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg>,
    delete: <svg style={{ color: "red" }} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
}

const fixedUnits = ["kg", "pice", "packet", "catton"];

const data1 = [
    {   
        _id:'',
        productName: "",
        unit: "",
        perUnitPrice: "",
        availableStock: ""
    }
]



const AnalysisTable = (props: Props) => {
    const [refetch, setRe] = useState(0);
    const newTab = new Array(1);
    const modifyTab = newTab.fill(0);
    const [newTabData, setNewTabData] = useState(modifyTab);

    const [data, setData] = useState(data1);

    const [state, setState] = useState({
        productName: "",
        unit: "",
        perUnitPrice: "",
        availableStock: ""
    });

    const getItemsDetails = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        fetch('https://dukan-server-daiu7oxok-ahsan-sayeed.vercel.app/analytics')
            .then((e) => e.json())
            .then(e => setData(e))
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }, [refetch])

    const handleSubmit = () => {
        // setData(() => [...data, state])
        fetch('https://dukan-server-daiu7oxok-ahsan-sayeed.vercel.app/analytics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch
                    setRe(() => refetch + 1);
                }
            })
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }


    const handleDelete = (id: string) => {
        // setData((prev) => prev.filter((v) => v._id !== id));
        fetch(`https://dukan-server-daiu7oxok-ahsan-sayeed.vercel.app/analytics/${id}`, {
            method: 'DELETE',
        })
            .then(e => {
                if (e.status === 200) {
                    //refetch
                    setRe(() => refetch + 1);
                }
            })
            .catch(err => {
                alert('Something went wrong, Contact developer')
            })
    }



    return (
        <div className="overflow-x-auto min-w-screen border rounded-xl ms-5 bg-base-100">
            <table className="table table-xs">
                <thead className='bg-neutral text-white'>
                    <tr>
                        <th></th>
                        <th>Product Name</th>
                        <th>Quantity in</th>
                        <th>Price</th>
                        <th>Stock Available</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((v, idx) => {
                            return (<tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{v.productName}</td>
                                <td>
                                    <p>{v.unit}</p>
                                </td>
                                <td>
                                    <p key={idx}>৳{v.perUnitPrice}</p>

                                </td>
                                <td>
                                    <p key={idx}>{v.availableStock} <span>{v.unit}</span></p>
                                </td>
                                <td className='btn btn-error text-white btn-sm' onClick={(e) => handleDelete(v._id)}>Delete</td>
                            </tr>)
                        })
                    }


                    {newTabData.map((v, idx) => <tr key={idx}>
                        <th>{data.length + 1}</th>
                        <td>
                            <input type="text" name="productName" placeholder='type here'
                                onChange={getItemsDetails} className='border border-primary' />
                        </td>
                        <td>
                            <select
                                name="unit" id="pet-select" className='block border' onChange={getItemsDetails}>
                                <option selected disabled>select one</option>
                                {fixedUnits.map((v, idx) => <option value={v} key={idx}>{v}</option>)}
                            </select>
                        </td>
                        <td>
                            <input type='number' placeholder='type here' onChange={getItemsDetails}
                                name="perUnitPrice" className='border border-primary block' ></input>
                        </td>
                        <td>
                            <input type='number' placeholder='type here' onChange={getItemsDetails}
                                name="availableStock" className='border border-primary block' ></input>
                        </td>
                        <td>
                        </td>
                    </tr>)}

                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th className='btn w-full bg-base-100 btn-outline' onClick={handleSubmit}>Submit</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

// {/* <div className="overflow-x-auto min-w-screen border rounded-xl ms-5 bg-base-100">
// <table className="table table-xs">
//     <thead className='bg-neutral text-white'>
//         <tr>
//             <th></th>
//             <th>Product Name</th>
//             <th>Quantity in</th>
//             <th>Price</th>
//             <th>Stock Available</th>
//             <th>Delete</th>
//         </tr>
//     </thead>
//     <tbody> */}
// //    {//update
// //     data.map((v, idx) => {
// //         return (<tr key={idx}>
// //             <th className={`${selectItem === idx && "border border-error"}`}>{idx + 1}</th>
// //             <input type="text" name="productName" placeholder='type here'
// //                 onChange={getItemsDetails} defaultValue={v.productName} className='border border-primary' />
// //             <td>
// //                 <select
// //                     name="unit" id="pet-select" className='block border' defaultValue={v.unit} onChange={getItemsDetails}>
// //                     <option selected disabled>select one</option>
// //                     {fixedUnits.map((v, idx) => <option value={v}>{v}</option>)}
// //                 </select>
// //             </td>
// //             <td>
// //                 <input type='number' placeholder='type here' defaultValue={v.perUnitPrice} onChange={getItemsDetails}
// //                     name="perUnitPrice" className='border border-primary block' ></input>

// //             </td>
// //             <td>
// //             <input type='number' placeholder='type here' defaultValue={v.availableStock} onChange={getItemsDetails}
// //             name="availableStock" className='border border-primary block' ></input>
// //             </td>
// //             {/* <td className='btn btn-error text-white btn-sm' onClick={(e) => handleDelete(v._id)}>Delete</td> */}
// //         </tr>)
// //     })
// // }
// // </tbody>
// //                 <tfoot>
// //                     <tr>
// //                         <th></th>
// //                         <th></th>
// //                         <th></th>
// //                         <th></th>
// //                         <th></th>
// //                         <th className='btn w-full bg-base-100 btn-outline' onClick={handleSubmit}>Submit</th>
// //                     </tr>
// //                 </tfoot>
// //             </table>
// //         </div>

export default AnalysisTable