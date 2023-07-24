import React from 'react'

const icons = {
    edit: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g id="Edit"><g><path d="M3.548,20.938h16.9a.5.5,0,0,0,0-1H3.548a.5.5,0,0,0,0,1Z"></path><path d="M9.71,17.18a2.587,2.587,0,0,0,1.12-.65l9.54-9.54a1.75,1.75,0,0,0,0-2.47l-.94-.93a1.788,1.788,0,0,0-2.47,0L7.42,13.12a2.473,2.473,0,0,0-.64,1.12L6.04,17a.737.737,0,0,0,.19.72.767.767,0,0,0,.53.22Zm.41-1.36a1.468,1.468,0,0,1-.67.39l-.97.26-1-1,.26-.97a1.521,1.521,0,0,1,.39-.67l.38-.37,1.99,1.99Zm1.09-1.08L9.22,12.75l6.73-6.73,1.99,1.99Zm8.45-8.45L18.65,7.3,16.66,5.31l1.01-1.02a.748.748,0,0,1,1.06,0l.93.94A.754.754,0,0,1,19.66,6.29Z"></path></g></g></svg>,
    delete: <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
}

type Props = {
    editRecord:any
    v:{
        unit:string[],
    },
    selectUnits:string[],
    selectRecord:any,
    handleSelection:any,
    removeIems:any,
    defaultUnits:string[],
    idx:number
}

const UnitsItem = ({
    editRecord,
    v,
    selectUnits,
    selectRecord,
    handleSelection,
    removeIems,
    defaultUnits,
    idx
}: Props) => {

    return (
        <div>
            {!editRecord ?
                <span> {v?.unit?.map((d, ix) => <p key={ix}>{d}</p>)}  </span> :
                <>
                    <>
                        {selectUnits.map((v, i) => <p key={i} className={`${selectRecord.idx === idx ? 'visible' : 'hidden'} text-red-600 font-bold flex justify-between`}>
                            {v}
                            <button className='px-2 hover:text-red onHoverRed' onClick={() => removeIems(v)}>{icons.delete}</button>
                        </p>)}
                        <select name="" id="" onChange={handleSelection} className={`text-red-600 font-bold ${selectRecord.idx === idx ? 'visible' : 'hidden'} bg-red-100`}>
                            <option value="" disabled selected >Select</option>
                            {
                                defaultUnits?.map((v, i) => <option key={i} value={v}>{v}</option>)
                            }
                        </select>
                    </>
                    <span className={`${selectRecord.idx === idx ? 'hidden' : 'visible'}`}> {v?.unit?.map((d, ix) => <p key={ix}>{d}</p>)}  </span>
                </>
            }
        </div>
    )
}

export default UnitsItem