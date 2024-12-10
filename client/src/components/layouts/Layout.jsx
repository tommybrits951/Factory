import { Outlet} from "react-router-dom";
import { useContext } from "react";
import FactoryContext from "../../context/factory";
import Navbar from "../nav/Navbar";


export default function Layout() {
  const {closeDropdown} = useContext(FactoryContext)
  function closeHandle(e) {
    closeDropdown(e)
  }
  return (
    <div onClick={closeHandle} className="">
      <Navbar />
      <Outlet />
    </div>
  )

}
