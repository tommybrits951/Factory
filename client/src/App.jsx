import { useState, createContext, useEffect } from 'react'
import useMaterials from './hooks/useMaterials'
import useUsers from './hooks/useUsers'
import './App.css'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'
import Navbar from './components/nav/Navbar'
import Parts from './components/inventory/parts/Parts'
import Register from "./components/user/Register"
import useParts from './hooks/useParts'
import Login from './components/auth/Login'
import Layout from './components/layouts/Layout'
import Monitor from './components/production/Monitor'
import useMachines from './hooks/useMachines'
import { jwtDecode } from 'jwt-decode'
import FactoryContext from './context/factory'
function App() {
  const [dropdown, setDropdown] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [users] = useUsers()
  const [parts] = useParts()
  const [machines] = useMachines()
  const [materials] = useMaterials()
  function assignToken(tkn) {
    if (tkn) {
      setToken(tkn)
      const decoded = jwtDecode(JSON.stringify(tkn))
      setUser(decoded)
    }
  }

  function checkAuth() {
    if (user !== null) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === user.email) {
          return true
        }
      }
    }
    return false
  }
  function closeDropdown(e) {
    const { name } = e.target;
    if (name === "open") {
      setDropdown(!dropdown)
    } else {
      setDropdown(false)
    }
  }
  useEffect(() => {
    console.log(users)
  }, [])


  useEffect(() => {
    axios.get("http://localhost:9000/auth", {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        Authorization: token ? `Bearer ${token}` : null
      }
    })
      .then(res => {
        setToken(res.data)
      })
      .catch(err => console.log(err))
    assignToken(token)
  }, [token])

  return (

    <FactoryContext.Provider
      value={{
        user,
        assignToken,
        closeDropdown,
        dropdown,
        token,
        parts, 
        materials,
        machines
      }}
    >
      <div>
        {checkAuth() === false ?
          <Login />
          :
          <Routes>
            <Route path='/*' element={<Layout />} >
              <Route index element={<Monitor />} />
              {/* <Route path='/parts' element={<Parts />} />
              <Route path='/reg' element={<Register />} />
              <Route path='/mat' element={<Materials />} /> */}
            </Route>
          </Routes>


        }
      </div>
    </FactoryContext.Provider>

  )
}

export default App
