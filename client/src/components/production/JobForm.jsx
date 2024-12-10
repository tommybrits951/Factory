import { useState, useContext } from 'react'
import FactoryContext from '../../context/factory'
import axios from 'axios'


const initForm = {
  machine: "",
  priority: 10,
  job: "",
  partName: "",
  lot: "",
  material: "",
  amount: "",
  status: "pending",
  time: ""
}
export default function JobForm({closeForm}) {
  const [formData, setFormData] = useState(initForm)
  const { parts, machines } = useContext(FactoryContext)
  function change(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  function submit(e) {
    e.preventDefault()
    
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
          <select name='part' className='w-1/4 text-black' onChange={change}>
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
