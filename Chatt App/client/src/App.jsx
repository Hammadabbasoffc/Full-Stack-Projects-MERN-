import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtechRoute from './components/auth/ProtectRoute'
import LoadersLayout from './components/layout/Loaders'
const Home = lazy(() => import('./pages/Home'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
const Login = lazy(() => import('./pages/Login'))
const NotFound = lazy(() => import('./pages/NotFound'))

let user = true

const App = () => {
  return (
    <Router>
     <Suspense fallback={<LoadersLayout/>}>
     <Routes>
        <Route element={<ProtechRoute user={user} />} >
          <Route path='/' element={<Home />} />
          <Route path='/chat/:chatId' element={<Chat />} />
          <Route path='/groups' element={<Groups />} />
        </Route>

        <Route path='/login' element={
          <ProtechRoute user={!user} redirect='/'>
            <Login />
          </ProtechRoute>
        } />
        <Route path="*" element={<NotFound/>} />
      </Routes>
     </Suspense>
    </Router>
  )
}

export default App