import "./components/complete.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import NotesPage from './components/NotesPage'
import Login from './components/Login'
import Signup from './components/Signup'
import ProtectedRoute from './components/ProtectedRoute'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/note' element={
        <ProtectedRoute>
          <NotesPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App