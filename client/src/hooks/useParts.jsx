import {useState, useEffect} from 'react'
import axios from 'axios'
export default function useParts() {
  const [parts, setParts] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9000/part", {
        withCredentials: true,
        baseURL: "http://localhost:9000"
    })
    .then(res => setParts(res.data))
    .catch(err => console.log(err))
  }, [])
  return [parts, setParts]
}
