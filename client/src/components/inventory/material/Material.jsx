import { useState, useEffect } from 'react'
import axios from 'axios'
import { faArrowCircleDown, faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Material({ material, tab, num, openTab }) {
    const [total, setTotal] = useState(0)
    const [formData, setFormData] = useState({
        location: "",
        amount: "",
        lot: ""
    })
    const { stock } = material
    function change(e) {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    function tabHandler(e) {
        const {value} = e.target;
        console.log(value)
        openTab(value)
    }
    useEffect(() => {
        let num = 0;
        material.stock.map(mat => {
            num = Math.abs(mat.amount + num)
        })
        setTotal(num)
    }, [])



    const content = material ? (
        <div className='border-2 border-stone-700 rounded p-2 flex justify-between'>
            <div>
                <h3>Name: {material.materialName}</h3>
                <p>Total {total} Lbs.</p>
            </div>
            <div>
                <button className={`${num === tab ? null : "hidden"}`} value={num} onClick={tabHandler}>
                    <FontAwesomeIcon value={num} onClick={tabHandler} icon={faArrowAltCircleLeft} />
                </button>
                <button value={num} onClick={tabHandler} className={}>
                    <FontAwesomeIcon value={num} onClick={tabHandler} icon={faArrowCircleDown} />
                </button>
            </div>
            <ul className={`${num === tab ? null : "hidden"}`}>
                {material ? material.stock.map((itm, idx) => {
                    <li key={idx}>
                        <p>Location: {itm.location}</p>
                        <p>Amount: {itm.amount} Lbs.</p>
                        <p>Lot: {itm.lot}</p>
                    </li>
                }) : <p>Nothing Here</p>}
            </ul>
        </div>
    ) : <p>Loading...</p>
    return content

}