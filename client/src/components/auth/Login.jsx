import { useState, useContext } from 'react';
import FactoryContext from '../../context/factory';
import axios from 'axios';


const initData = {
    email: "",
    password: ""
}

export default function Login() {
    const [formData, setFormData] = useState(initData)
    const [error, setError] = useState("")
    const { assignToken } = useContext(FactoryContext)
    const change = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const tokenHandler = (token) => {
        assignToken(token)
    }

    const submit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:9000/auth", formData, {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
            .then(res => {
                tokenHandler(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <section className='text-center absolute left-1/3 bg-stone-600 w-1/3 top-32 rounded-lg'>
            <h3 className='text-3xl text-stone-100 m-2'>Login User</h3>
            
            <form onSubmit={submit} className='bg-stone-600 m-0 rounded-lg'>
                <label className='m-2'>
                    Email
                    <br />
                    <input
                    className='p-1 rounded'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={change}
                    />
                </label>
                <br />
                <label className='m-2'>
                    Password
                    <br />
                    <input
                    className='p-1 rounded'
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={change}
                    />
                </label>
                <div className='flex justify-around m-2'>


                    <button type='submit' className='bg-stone-600 p-2 rounded-lg text-white hover:scale-95 m-2'>Submit</button>
                </div>
            </form>
        </section>
    )
}
