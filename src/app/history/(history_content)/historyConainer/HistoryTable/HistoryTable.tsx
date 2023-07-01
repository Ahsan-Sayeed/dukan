import React, { useState } from 'react'
import HistoryModal from './HistoryModal/HistoryModal'
import PDFdrive from '../../PDFdrive/PDFdrive'
import { PDFDownloadLink } from '@react-pdf/renderer'

type Props = {
    history: {
        address: string,
        courier: boolean
        customerName: string
        date: string
        due: number,
        phone: string,
        products: {
            productId: string,
            productName: string,
            quantity: number,
            totalPrice: number
            unit: string,
            __v: number,
            _id: string
        }[],
        sellerEmail: string,
        sellerName?: string | null
        sellerUID: string
        totalPrice: number,
        __v: number,
        _id: string
    }[]
}

const icons = {
    pdf: <svg stroke="currentColor" className='hover:bg-base-300' style={{ color: 'red' }} fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13.156 9.211c-0.213-0.21-0.686-0.321-1.406-0.331-0.487-0.005-1.073 0.038-1.69 0.124-0.276-0.159-0.561-0.333-0.784-0.542-0.601-0.561-1.103-1.34-1.415-2.197 0.020-0.080 0.038-0.15 0.054-0.222 0 0 0.339-1.923 0.249-2.573-0.012-0.089-0.020-0.115-0.044-0.184l-0.029-0.076c-0.092-0.212-0.273-0.437-0.556-0.425l-0.171-0.005c-0.316 0-0.573 0.161-0.64 0.403-0.205 0.757 0.007 1.889 0.39 3.355l-0.098 0.239c-0.275 0.67-0.619 1.345-0.923 1.94l-0.040 0.077c-0.32 0.626-0.61 1.157-0.873 1.607l-0.271 0.144c-0.020 0.010-0.485 0.257-0.594 0.323-0.926 0.553-1.539 1.18-1.641 1.678-0.032 0.159-0.008 0.362 0.156 0.456l0.263 0.132c0.114 0.057 0.234 0.086 0.357 0.086 0.659 0 1.425-0.821 2.48-2.662 1.218-0.396 2.604-0.726 3.819-0.908 0.926 0.521 2.065 0.883 2.783 0.883 0.128 0 0.238-0.012 0.327-0.036 0.138-0.037 0.254-0.115 0.325-0.222 0.139-0.21 0.168-0.499 0.13-0.795-0.011-0.088-0.081-0.196-0.157-0.271zM3.307 12.72c0.12-0.329 0.596-0.979 1.3-1.556 0.044-0.036 0.153-0.138 0.253-0.233-0.736 1.174-1.229 1.642-1.553 1.788zM7.476 3.12c0.212 0 0.333 0.534 0.343 1.035s-0.107 0.853-0.252 1.113c-0.12-0.385-0.179-0.992-0.179-1.389 0 0-0.009-0.759 0.088-0.759v0zM6.232 9.961c0.148-0.264 0.301-0.543 0.458-0.839 0.383-0.724 0.624-1.29 0.804-1.755 0.358 0.651 0.804 1.205 1.328 1.649 0.065 0.055 0.135 0.111 0.207 0.166-1.066 0.211-1.987 0.467-2.798 0.779v0zM12.952 9.901c-0.065 0.041-0.251 0.064-0.37 0.064-0.386 0-0.864-0.176-1.533-0.464 0.257-0.019 0.493-0.029 0.705-0.029 0.387 0 0.502-0.002 0.88 0.095s0.383 0.293 0.318 0.333v0z"></path><path d="M14.341 3.579c-0.347-0.473-0.831-1.027-1.362-1.558s-1.085-1.015-1.558-1.362c-0.806-0.591-1.197-0.659-1.421-0.659h-7.75c-0.689 0-1.25 0.561-1.25 1.25v13.5c0 0.689 0.561 1.25 1.25 1.25h11.5c0.689 0 1.25-0.561 1.25-1.25v-9.75c0-0.224-0.068-0.615-0.659-1.421v0zM12.271 2.729c0.48 0.48 0.856 0.912 1.134 1.271h-2.406v-2.405c0.359 0.278 0.792 0.654 1.271 1.134v0zM14 14.75c0 0.136-0.114 0.25-0.25 0.25h-11.5c-0.135 0-0.25-0.114-0.25-0.25v-13.5c0-0.135 0.115-0.25 0.25-0.25 0 0 7.749-0 7.75 0v3.5c0 0.276 0.224 0.5 0.5 0.5h3.5v9.75z"></path></svg>,
    download: <svg stroke="currentColor" className='hover:bg-base-300' fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M1,17 L1,23 L23,23 L23,17 M12,2 L12,19 M5,12 L12,19 L19,12"></path></svg>
}

const HistoryTable = ({ history }: Props) => {
    const [inx, setInx] = useState<number>(0);
    return (
        <>
            <HistoryModal history={history} inx={inx} />
            <div className='border rounded-xl bg-base-100 md:mx-5 mt-5 shadow-xl border'>
                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Due</th>
                                <th>Paid</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((v, idx) => {
                                return (
                                    <tr key={idx}>
                                        <th className='bg-neutral text-white w-fit'>{idx + 1}</th>
                                        <td>{v?.customerName}</td>
                                        <td>{v?.phone}</td>
                                        <td>{v?.due}</td>
                                        <td>{v?.totalPrice - v?.due}</td>
                                        <td>{v?.date}</td>
                                        <td>
                                            <button className='p-2'>
                                                <label htmlFor="my_modal_6" onClick={(e) => setInx(idx)}>
                                                    {icons.pdf}
                                                </label>
                                            </button>
                                            <button className='p-2'>
                                                <PDFDownloadLink document={<PDFdrive history={history} inx={inx} />} fileName='Form' >
                                                    {icons.download}
                                                </PDFDownloadLink>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th>Customer</th>
                                <th>Phone</th>
                                <th>Due</th>
                                <th>Paid</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default HistoryTable