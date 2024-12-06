import {useState, useEffect} from 'react'
import NewPartsForm from './NewPartsForm'
import PartsList from "./PartsList"
import axios from "axios";
export default function Parts() {
  const [parts, setParts] = useState([])
  


  useEffect(() => {
    axios.get("http://localhost:9000/part", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      console.log(res.data)
      setParts(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  const content = (
      <section className="grid grid-cols-5 grid-rows-12 h-full">
        <h2 className='text-4xl bg-stone-500 p-1 font-bold text-center col-start-1 col-end-6 row-start-1 row-end-2 text-white'>Parts</h2>
        <div className='row-start-2 row-end-13 col-start-1 col-end-3 h-full'>
          <NewPartsForm parts={parts} />
        </div>
        <div className='row-start-2 row-end-13 col-start-3 col-end-6'>
          <PartsList parts={parts} />
        </div>
      </section>
  )
  
  return content
}
