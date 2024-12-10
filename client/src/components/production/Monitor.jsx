import { useContext, useState } from "react"
import FactoryContext from "../../context/factory"
import Row from "./Row"
import JobForm from "./JobForm"
const titles = [
  "#", "!", "Job", "Part", "Sku", "Material", "Lot", "Amount", "Time", "Status"
]
export default function Monitor() {
  const { machines } = useContext(FactoryContext)
  const [formOpen, setFormOpen] = useState(false)
  
function openForm(e) {
  e.preventDefault()
  setFormOpen(true)
}
function closeForm() {
  setFormOpen(false)
}


  const content = machines.length > 0 ? (
    <div id='monitorDiv'>
      {formOpen === true ? <JobForm closeForm={closeForm} /> : null}
      <div id='monitor' >
        <div className='row'>
          {titles.map((ttl, idx) => {
            return <div key={idx} className='ttl-cell'>{ttl}</div>
          })}
        </div>
        {machines.map((mach, idx) => {
          return <Row machine={mach} key={idx} />
        })}
      </div>
<button onClick={openForm} className="ml-5 mt-5 bg-stone-500 text-white p-2 rounded hover:scale-95">New Job</button>
    </div>
  ) : <p>Loading...</p>
  return content
}
