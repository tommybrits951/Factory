import { useState, useContext, useEffect } from 'react'
import FactoryContext from '../../../context/factory'
import axios from 'axios'

const initData = {
    materialName: "",
    vendorPhone: "",
    stock: []
}
export default function MaterialForm({ handler}) {
    const [error, setError] = useState("")
    const [formData, setFormData] = useState(initData)
    const { token } = useContext(FactoryContext)
    const change = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData({ ...formData, [name]: value })
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/mat", formData, {
            withCredentials: true,
            baseURL: "http://localhost:9000",
            headers: {
                Authorization: `Bearer ${token.accessToken}`
            }
        })
            .then(res => {
                console.log(res.data)
                handler(res.data.matList)
            })
            .catch(err => console.log(err))
    }

    return (
        <section className='text-center bg-stone-700 border-2 h-full'>
            <h3 className='text-3xl m-1 p-2 font-mono text-white'>Add New Material</h3>
            <p>{error}</p>
            <form className='bg-stone-300 p-2 h-full border-4' onSubmit={submit}>
                <label>
                    Material Name
                    <br />
                    <input className={`p-1 rounded w-3/4 `} type='text' placeholder='new material name' name='materialName' value={formData.materialName} onChange={change} />
                   
                </label>
                <br />
                <label>
                    Vendor Phone
                    <br />
                    <input placeholder='new material vendor phone number' className={`p-1 rounded w-3/4 `} type='number' name='vendorPhone' value={formData.vendorPhone} onChange={change} required />
                </label>
                <br />
                <button className='bg-stone-600 mt-5 text-white py-2 px-3 hover:scale-95 shadow-xl rounded-xl' type='submit'>Submit</button>

            </form>
        </section>
    )
}
