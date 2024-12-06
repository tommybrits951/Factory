import { Outlet} from "react-router-dom";
import { useState } from "react";

const navItems = [
  {
    name: "Materials",
    path: "/mat"
  },
  {
    name: "Parts",
    path: "/parts"
  },
{
  name: "Monitor",
  path: "/"
}
]


export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
   function openMenu(e) {
    const {name} = e.target;
    if (name === "openBtn") {
      return setMenuOpen(!menuOpen)
    } else {
      return setMenuOpen(false)
    }
   }


  return 
  <div className="h-full w-full">
    <nav className="fixed top-0 left-0 w-full bg-stone-800">
      <div>
        <button onClick={openMenu} name="openBtn">Menu</button>
        <ul className={`${openMenu === false ? "hidden" : "absolute"}`}>
        {menuItems.map((itm, idx) => {
          return (
            <li key={idx}>
              <Link to={itm.path}>{itm.name}</Link>
            </li>
          )
        })}
        </ul>
      </div>
    </nav>
  <Outlet />
  </div>
}
