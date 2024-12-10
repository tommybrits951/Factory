import { useState, useEffect } from "react"
import axios from 'axios'


export default function useMachines() {
  const [machines, setMachines] = useState([])
  useEffect(() => {
    axios.get("http://localhost:9000/mach", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      setMachines(res.data)
    })
    .catch(err => console.log(err))
  }, [])
  useEffect(() => {
    axios.get("http://localhost:9000/mach", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
    .then(res => {
      setMachines(res.data)
    })
    .catch(err => console.log(err))
  }, [machines])

  return [machines, setMachines]
}
