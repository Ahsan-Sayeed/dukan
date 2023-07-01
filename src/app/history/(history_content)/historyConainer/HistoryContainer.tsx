import React, { useEffect, useState } from 'react'
import SearchHistory from './SearchHistory/SearchHistory';
import HistoryTable from './HistoryTable/HistoryTable';
import { url } from '@/config/backendConfig';

type Props = {}

const HistoryContainer = (props: Props) => {
  const [history, setHistory] = useState([]);
  const [data, setData] = useState('');

  useEffect(() => {
    fetch(`${url}history?data=${data}`)
      .then((e) => e.json())
      .then(e => setHistory(e))
      .catch(err => {
        alert('Something went wrong, Contact developer')
      })
  }, [data])


  return (
    <div>
      <SearchHistory setData={setData} />
      <HistoryTable history={history} />
    </div>
  )
}

export default HistoryContainer