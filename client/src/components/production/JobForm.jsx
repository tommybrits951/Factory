import { useState, useContext } from 'react'
import FactoryContext from '../../context/factory'
import axios from 'axios'
import { v4 as uuid } from "uuid"

const initForm = {
  machine: "",
  partId: "",
  lot: "",
  amount: "",
}
export default function JobForm({ closeForm }) {
  const [formData, setFormData] = useState(initForm)
  const [currentMachine, setCurrentMachine] = useState()
  const { parts, machines } = useContext(FactoryContext)
  const [currentPart, setCurrentPart] = useState()
  function change(e) {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData({ ...formData, [name]: value })
  }

  function getPart() {
    axios.get(`http://localhost:9000/part/${formData.partId}`, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
      .then(res => {
        const estTime = Math.ceil((formData.amount / res.data.cavities) * res.data.cycle)
        console.log(res.data)
        setCurrentMachine({
          number: formData.machine,
          lot: formData.lot,
          partName: res.data.partName,
          job: uuid(),
          material: res.data.material.materialName,
          partNumber: res.data.partNumber,
          status: "pending",
          amount: formData.amount,
          priority: 10,
          time: estTime,
        })
        setCurrentPart(res.data)
      })
      .catch(err => console.log(err))
  }

  function submit(e) {
    e.preventDefault()
    getPart()
    axios.patch(`http://localhost:9000/mach/${formData.machine}`, currentMachine, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  function closeHandle(e) {
    e.preventDefault()
    closeForm()
  }

  const content = parts ? (
    <section className='absolute text-center bg-stone-800 w-1/2 p-5 left-1/4'>
      <button onClick={closeHandle} className='bg-red-500 float-right p-2 text-white rounded hover:scale-95'>X</button>
      <h3 className='text-white text-3xl mb-3'>New Job</h3>
      <form onSubmit={submit}>
        <label className='text-white'>
          Machine
        </label>
        <br />
        <select className='w-1/4 rounded' name='machine' onChange={change}>
          {machines.map((mac, idx) => {
            return <option key={idx}>{mac.number}</option>
          })}
        </select>
        <br />
        <label className='text-white'>
          Part
        </label>
        <br />
        <select name='partId' className='w-1/4 text-black' onChange={change}>
          {parts.map((pt, idx) => {
            return <option key={idx} value={pt._id}>{pt.partName}</option>
          })}
        </select>
        <br />
        <label className='text-white'>
          Amount
        </label>
        <br />
        <input className='rounded p-1' type='number' name='amount' onChange={change} value={formData.amount} required />
        <br />
        <label className='text-white'>
          Material Lot
        </label>
        <br />
        <input type='text' name='lot' className='rounded p-1' value={formData.lot} onChange={change} />
        <br />
        <button type='submit' onClick={submit} className='rounded text-white bg-stone-700 p-1 mt-3'>Submit</button>
      </form>
    </section>
  ) : <p>Loading</p>
  return content
}
