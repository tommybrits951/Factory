import { useEffect, useState } from "react"
import MaterialForm from "./MaterialForm"
import MaterialList from "./MaterialList"
import axios from 'axios'

export default function Materials() {
  const [materials, setMaterials] = useState([])

  const materialsHandler = (arr) => {
    setMaterials(arr)
  }

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
  
  return (
    <div className="absolute w-full p-0 m-0 grid grid-cols-5 bg-stone-400">
      <h2 className="text-center col-start-1 col-end-6 text-6xl font-audio">Materials</h2>
      <div className="col-start-1 col-end-3">
        <MaterialForm materials={materials} handler={materialsHandler} />
      </div>
      <div className="col-start-3 col-end-6 h">
        <MaterialList materials={materials}/>
      </div>
    </div>
  )
}
