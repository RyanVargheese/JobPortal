import {Route,Routes} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Applications from "./pages/Applications"
import ApplyJobs from "./pages/ApplyJobs"
import Home from "./pages/Home"
import RecruiterLogin from './components/RecruiterLogin'
import DashBoard from './pages/DashBoard'
import AddJob from './pages/AddJob'
import ManageJobs from './pages/ManageJobs'
import ViewApplications from './pages/ViewApplications'
import 'quill/dist/quill.snow.css'

 import { ToastContainer } from 'react-toastify';

function App() {

  const {showRecruiterLogin,companyToken}=useContext(AppContext)

  return (
    <>
      {/* Acts like Toggle */}
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/apply-jobs/:id' element={<ApplyJobs/>} />
        <Route path='/applications' element={<Applications/>} />
        <Route path='/dashboard' element={ <DashBoard/> }>
          {companyToken ? <>
            <Route path='add-job' element={<AddJob/>} />
            <Route path='manage-jobs' element={<ManageJobs/>} />
            <Route path='view-applications' element={<ViewApplications/>} />

          </>:null}
          
        </Route>
      </Routes>
    </>
  )
}

export default App
