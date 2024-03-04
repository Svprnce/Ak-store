import { Provider } from 'react-redux'
import Footer from './components/footer'
import Navbar from "./components/navbar"
import { Outlet } from 'react-router-dom'
import store from "./app/store"
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { setcartsinstate, setloginstate, setlogoutstate, setuserdetail } from './app/slices/userSlice'
import { fetchcarts, fetchlogout, fetchprofile } from '../utils/fetch'
import { ErrorBoundary, ErrorBoundaryContext } from 'react-error-boundary'
import Somethingwentwrong from './components/somethingwrong'


function App() {
  const dispatch = useDispatch()
  const userdetail = localStorage.getItem('akuser')
  const islogged = useSelector((state)=>state.user.islogged)
  useEffect(() => {
    //console.log(userdetail !== null);
    if (userdetail) {
      fetchprofile().then((res) => {
        if(res.msg == 'no token'){
          localStorage.removeItem('akuser')
        }
        dispatch(setuserdetail(res))
      })
      fetchcarts().then((res)=>{
        res?.forEach((r)=>{
          dispatch(setcartsinstate(r))
        })
        
      })
      dispatch(setloginstate(true))
    }
    else{
      localStorage.removeItem('akuser')
      dispatch(setlogoutstate())
      fetchlogout().then((res)=>{
    })
    }
  }, [islogged])
  return (
    <>

      <Provider store={store}>
        {/* <div className="min-vh-100"> */}
        <Navbar />
        <ErrorBoundary fallback={<Somethingwentwrong/>}>
        <Outlet />
        <Footer />
        </ErrorBoundary>
        {/* </div> */}
      </Provider>


    </>
  )
}

export default App
