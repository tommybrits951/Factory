import { useState, createContext, useEffect } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import axios from 'axios'

import Parts from './components/inventory/parts/Parts'
import Register from "./components/user/Register"
import Login from './components/auth/Login'
import Layout from './components/layouts/Layout'
import Monitor from './components/production/Monitor'
import Materials from './components/inventory/material/Materials'
import { jwtDecode } from 'jwt-decode'
import FactoryContext from './context/factory'
function App() {
  const [dropdown, setDropdown] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [userList, setUserList] = useState([])
  const [partsList, setPartsList] = useState([])

  function assignToken(tkn) {
    if (tkn) {
      setToken(tkn)
      const decoded = jwtDecode(JSON.stringify(tkn))
      setUser(decoded)
    }
  }

  function checkAuth() {
    if (user !== null) {
      for (let i = 0; i < userList.length; i++) {
        if (userList[i].email === user.email) {
          return true
        }
      }
    }
    return false
  }
  function closeDropdown(e) {
    const { name } = e.target;
    console.log(name, dropdown)
    if (name !== "main") {
      setDropdown(!dropdown)
    } else if (name === "open") {
      setDropdown(true)
    }
  }
  useEffect(() => {
    axios.get("http://localhost:9000/users", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
      .then(res => {
        setUserList(res.data)
      })
      .catch(err => console.log(err))
    axios.get("http://localhost:9000/part", {
      withCredentials: true,
      baseURL: "http://localhost:9000"
    })
      .then(res => {
        console.log(res.data)
        setPartsList(res.data)
      })
      .catch(err => console.log(err))
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
        partsList
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
