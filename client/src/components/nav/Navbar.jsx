import {useContext} from 'react'
import FactoryContext from '../../context/factory'
import { Link } from 'react-router-dom'

const menuItems = [
    "Monitor",
    "Parts", 
    "Materials"
]
const paths = [
    "/",
    "/parts",
    "/mat"
]
export default function Navbar() {
    const {dropdown, closeDropdown} = useContext(FactoryContext)

    function menuHandler(e) {
        closeDropdown(e)
    }
  return (
    <nav className='navbar'>
        <div className='dropdownDiv'>
            <button name='open' onClick={menuHandler} className='text-white text-2xl font-audio p-2 hover:bg-white hover:text-black'>&#9776;</button>
            <ul className={`${dropdown === true ? "dropdown" : "hidden"}`}>
                {menuItems.map((itm, idx) => {
                    return <li key={idx} className='p-2 font-audio hover:bg-stone-200 hover:scale-95'><Link to={paths[idx]}>{itm}</Link></li>
                })}
            </ul>
        </div>
    </nav>
  )
}
