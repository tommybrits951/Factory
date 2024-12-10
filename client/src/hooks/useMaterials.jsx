import {useState, useEffect} from 'react'
import axios from 'axios'
export default function useMaterials() {
  const [materials, setMaterials] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9000/mat", {
        withCredentials: true,
        baseURL: "http://localhost:9000"
    })
    .then(res => {
        setMaterials(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  return [materials, setMaterials]
}
