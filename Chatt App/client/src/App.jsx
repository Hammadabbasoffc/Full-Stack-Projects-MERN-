import React, {lazy} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const Home = lazy(()=>import('./pages/Home'))
const Chat = lazy(()=>import('./pages/Chat'))
const Groups = lazy(()=>import('./pages/Groups'))
const Login = lazy(()=>import('./pages/Login'))


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chat/:chatId' element={<Chat/>} />
        <Route path='/groups' element={<Groups/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App