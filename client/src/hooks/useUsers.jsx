import {useState, useEffect} from 'react'
import axios from 'axios'


export default function useUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:9000/users", {
            withCredentials: true,
            baseURL: "http://localhost:9000"
        })
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [])
    return [users, setUsers]
}
