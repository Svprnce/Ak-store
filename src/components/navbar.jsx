import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { fetchcarts, fetchcategory, fetchlogout } from "../../utils/fetch"
import { useEffect, useState } from "react"
import { updatecategoryinstate, updatesearchproductsinstate } from "../app/slices/productSlice"

import { setcartsinstate, setlogoutstate } from "../app/slices/userSlice"
import { logout } from "../../utils/logout"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

  const [searchquery, setsearchquery] = useState('')
  const dispatch = useDispatch()
  const cartcount = useSelector((store) => store.user.usercarts).flat()
  const categories = useSelector((store) => store.product.categories)
  const loginstate = useSelector((store) => store.user.islogged)
  const userdetails = useSelector((store) => store.user.userdetail)
  //const searchedproducts = useSelector((store)=>store.product.searchedproducts)
  const localstoragedata = localStorage.getItem('akuser')

  const navigate = useNavigate();

  useEffect(() => {
    if (loginstate) {

    }
    window.scroll({ top: 0, behavior: 'smooth' })
  }, [loginstate, userdetails, localstoragedata, cartcount])


  const handlelogout = (e) => {
    localStorage.removeItem('akuser')
    fetchlogout().then((res) => {

    })
    dispatch(setlogoutstate())
  }
  const handlesearchquery = (e) => {
    setsearchquery(e.target.value)
  }

  const handlesearch = (e) => {
    e.preventDefault()

    navigate(`/search/?q=${searchquery}`)
    //console.log('searched');
    setsearchquery('')
    //dispatch(updatesearchproductsinstate())
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to='/' className="navbar-brand text-primary" >Ak Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to='/' className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to='/cart' className="nav-link">Cart  {cartcount.length == 0 ? '' : (<span className="badge bg-primary bg">{cartcount.length} </span>)}</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </a>
              <ul className="dropdown-menu">
                {
                  categories.map((c, i) => {
                    return (
                      <li key={i}> <a className="dropdown-item" href="#">{c}</a> </li>
                    )
                  })
                }
                {/* <li><a className="dropdown-item" href="#">Electronics</a></li>
                <li><a className="dropdown-item" href="#">Books</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Furniture</a></li> */}
              </ul>
            </li>
            {loginstate ? <><li className="nav-item"><Link to='/order' className="nav-link ">
              Order
            </Link> </li><li className="nav-item"><Link to='/history' className="nav-link ">
              History
            </Link> </li><li className="nav-item"><Link className="nav-link " onClick={(e) => handlelogout(e)}>
              Logout
            </Link></li></> : <Link to='/login' className="nav-link ">
              Login
            </Link>}
            {/* <li className="nav-item">
              {loginstate ? <Link to='/order' className="nav-link ">
                Order
              </Link> : ''}
            </li>
            <li className="nav-item">
              {loginstate ? <Link className="nav-link " onClick={(e) => handlelogout(e)}>
                Logout
              </Link> : <Link to='/login' className="nav-link ">
                Login
              </Link>}
            </li> */}
            {/* <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> */}
          </ul>
          {loginstate ? (<div className="p my-3 d-flex">Welcome <strong className="mx-2 text-primary">{userdetails?.profile?.name} !!</strong></div>) : ''}
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchquery} onChange={(e) => handlesearchquery(e)} />
            <button className="btn btn-outline-primary" type="submit" onClick={(e) => handlesearch(e)} >Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}


export default Navbar