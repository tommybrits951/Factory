import {useState, useEffect} from 'react'
import axios from 'axios'
const initData = {
  partName: "",
  cycle: "",
  cavities: "",
  shotWeight: "",
  partWeight: "",
  material: "",
  stock: []
}
export default function PartsForm() {
  const [materials, setMaterials] = useState([])
  const [formData, setFormData] = useState(initData)

  function change(e) {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }
  function submit(e) {
    e.preventDefault()
    axios.post("http://localhost:9000/parts", formData, {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(res.data))
  }

  useEffect(() => {
    axios.get("http://localhost:9000/mat", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      console.log(res.data)
      setMaterials(res.data)
      setFormData({...formData, material: res.data[0]._id})
    })
    .catch(err => {
      console.log(err)
    })
  }, [])


  return (
    <section className='bg-stone-300 h-full text-center'>
      <h3 className='text-3xl font-mono border-2 bg-stone-400 p-2 w-full'>New Part</h3>
      <form onSubmit={submit} className=''>
          <br />
        <label>
          Name
          <br />
          <input className='p-1 w-3/4 rounded m-1' type='text' name='partName' value={formData.partName} onChange={change} required />
        </label>
          <br />
        <label>
        Cycle Time
          <br />
          <input className='p-1 w-3/4 rounded m-1' type='number' name='cycle' placeholder='in seconds' value={formData.cycle} onChange={change} required />
        </label>
          <br />
        <label>
          Cavities
          <br />
          <input className='p-1 w-3/4 rounded m-1' type='number' name='cavities' placeholder='parts made at once' value={formData.cavities} onChange={change} required />
        </label>
          <br />
        <label>
          Shot Weight
          <br />
          <input className='p-1 w-3/4 rounded m-1' type='number' name='shotWeight' value={formData.shotWeight} placeholder='in ounces' onChange={change} required />
        </label>
          <br />
        <label>
          Single Part Weight
          <br />
          <input className='p-1 w-3/4 rounded m-1' type='number' name='partWeight' value={formData.partWeight} placeholder='in ounces' onChange={change} required />
        </label>
          <br />
        <label>
          Material
          <br />
          <select name='material' className='p-1 rounded m-1'>
            {materials ? materials.map((mater, idx) => {
              return (
                <option value={mater._id} key={idx}>{mater.materialName}</option>
              )
            }) : <p>Loading...</p>}
          </select>
        </label>
            <br />
        <div>
          <button className='bg-stone-800 text-white p-2 rounded-lg w-1/2 mt-5'>Submit</button>
        </div>
      </form>
    </section>
  )
}
