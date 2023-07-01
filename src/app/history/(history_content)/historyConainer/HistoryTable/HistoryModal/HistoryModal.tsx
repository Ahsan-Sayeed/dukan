import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import PDFdrive from '../../../PDFdrive/PDFdrive'

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
    }[],
    inx: number
}

const HistoryModal = ({ history, inx }: Props) => {
    return (
        <div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{history[inx]?.customerName===''? 'No Name':  history[inx]?.customerName} / {history[inx]?.phone}</h3>
                    <div className="py-4">
                        <PDFViewer width="450" height="420" className="app" >
                            <PDFdrive history={history} inx={inx} />
                        </PDFViewer>
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn btn-error text-white">Close!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryModal;