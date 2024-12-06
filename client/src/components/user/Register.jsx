import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FactoryContext from "../../context/factory"


const initData = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    roles: [],
    role: ""
}

export default function Register() {
    const [formData, setFormData] = useState(initData)
    const [error, setError] = useState("")
    const {user, setUser} = useContext(FactoryContext)
    const navigate = useNavigate()
    
    
    const change = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const addRole = (e) => {
        e.preventDefault()
        if (formData.roles.includes(formData.role)) {
            return setError("Role already added")
        }
        setFormData({ ...formData, roles: [...formData.roles, formData.role]})
        console.log(formData)
    }
    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/users", {...formData, role: undefined}, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response.data.message)
        })
    }
    return (
        <section className='text-center absolute bg-stone-300 lg:w-1/2 md:w-3/4 md:left-28 lg:left-1/4 top-20 rounded-lg'>
            <h3 className='text-3xl m-3 text-stone-700'>Register New User</h3>
            <p className='text-red-500'>{error}</p>
            <form onSubmit={submit} className='flex flex-col bg-stone-200 rounded-lg'>
                <label className='m-2'>
                    First Name
                    <br />
                    <input
                    className='w-1/2 p-1' 
                    type='text' 
                    name='firstName' 
                    value={formData.firstName} 
                    onChange={change} 
                    required />
                </label>
                <label className='m-2'>
                    Last Name
                    <br />
                    <input
                    className='w-1/2 p-1' 
                    type='text' 
                    name='lastName' 
                    value={formData.lastName} 
                    onChange={change} 
                    required />
                </label>
                <label className='m-2'>
                    Email
                    <br />
                    <input
                    className='w-1/2 p-1' 
                    type='email' 
                    name='email' 
                    value={formData.email} 
                    onChange={change} 
                    required />
                </label>
                <label className='m-2'>
                    Password
                    <br />
                    <input
                    className='w-1/2 p-1' 
                    type='password' 
                    name='password' 
                    value={formData.password} 
                    onChange={change} 
                    required />
                </label>
                <label className='m-2'>
                    Phone Number
                    <br />
                    <input
                    className='w-1/2 p-1' 
                    type='phone' 
                    name='phone' 
                    value={formData.phone} 
                    onChange={change} 
                    required />
                </label>
                <label className='m-2'>Select Roles
                    <br />
                    <select name='role' value={formData.role} onChange={change}>
                        <option value={"production"}>Production</option>
                        <option value={"inventory"}>Inventory</option>
                        <option value={"management"}>Manager</option>
                        <option value={"admin"}>Admin</option>
                    </select>
                    <button onClick={addRole}>Add</button>
                </label>
                <div className='flex justify-around m-2'>
                    
                    <button type='submit' onClick={submit}>Submit</button>
                </div>
            </form>
        </section>
    )
}
