import { useDispatch, useSelector } from 'react-redux'
import { setloginstate, setuserdetail } from '../app/slices/userSlice'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { fetchregister } from '../../utils/authfetch';


export const Loginform = ({ close }) => {
    const [log,setlog] = useState({email : '', 'password' : ''})
    const [error, seterror]=useState({})
    // const [cookies, setCookie] = useCookies(["access_token"]);

    // console.log(cookies);
    const dispatch = useDispatch()
    const location = useLocation()
    

    const handleinputchange = (e)=>{
        seterror({})
        setlog({
            ...log,
            [e.target.name] : e.target.value
        })
    }
    
    const handlesubmit =async (e)=>{
        console.log(process.env.REACT_APP_BACKEND_URL);
        e.preventDefault()
        if(location.pathname !== '/login'){
            close()
        }
        const responce = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,{
            method : "POST",
            credentials : 'include',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(log)
        })
        // console.log(responce);
        const res = await responce.json()
        if(res.code == 200){
            //console.log(res.details);
            //localStorage.setItem('akuser',JSON.stringify(res.details))
            dispatch(setloginstate(true))
            dispatch(setuserdetail(res.details))
            localStorage.setItem('akuser',"logged")
            //console.log(document.cookie);
            //console.log(res.details);
            //localStorage.setItem('akuser',JSON.stringify(res.details))
            // console.log(cookies);
        }
        else{
            seterror(res)
            setlog({'email' : '', 'password' : ''})
        }
        //console.log('Login form clicked', res);
    }
    return (
        <div className="container">
            <Form>
                {error.msg ? <div className="btn w-100  text-start btn-danger btn-sm mb-3">Error : {error.msg}</div> : ''}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e)=>handleinputchange(e)} value={log.email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    {/* <div className="h6 my-1 w-100 text-danger">wrong password</div> */}
                    <Form.Control type="password" placeholder="Password" name='password' onChange={(e)=>handleinputchange(e)} value={log.password}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Save Login Info" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e) => handlesubmit(e)} >
                    Login
                </Button>
            </Form>
        </div>
    )
}

export const Registerform = () => {
    const [error, seterror] = useState({})
    const [reg,setreg] = useState({email : '',password : '', name : ''})

    const handleinputchange = (e)=>{
        seterror({})
        setreg({
            ...reg,
            [e.target.name] : e.target.value
        })
    }
    const handlesubmit =(e)=>{
        // console.log(e);
        e.preventDefault()
        //console.log('registration form clicked', reg);
        fetchregister(reg).then((res)=>{
            seterror(res)
            setreg({})
        })
    }
    return (
        <div className="container">
            <Form>
            {error.msg ? <div className="btn w-100  text-start btn-danger btn-sm mb-3">Error : {error.msg}</div> : ''}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="" name='email' onChange={(e)=>handleinputchange(e)} value={reg.email} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="" name='password' onChange={(e)=>handleinputchange(e)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Name" name='name' onChange={(e)=>handleinputchange(e)}/>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="Number" placeholder="" name='phone_number' onChange={(e)=>handleinputchange(e)}/>
                </Form.Group> */}
                <Form.Group className='my-3'>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name='gender' onChange={(e)=>handleinputchange(e)}>
                        <option id='gender-male'>Male</option>
                        <option id='gender-female'>Female</option>
                    </Form.Select>
                </Form.Group>

                {/* <Form.Group className="my-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit" onClick={(e)=>handlesubmit(e)}>
                    Register
                </Button>
            </Form>
        </div>
    )
}

const Login = () => {
    const [logpage, setlogpage] = useState(true)
    const islogged = useSelector((state) => state.user.islogged)
    const navigate = useNavigate()

    useEffect(() => {
        if (islogged) navigate('/')
    }, [islogged])

    const handletabstate = (e) => {


        switch (e.target.className) {
            case 'register-tab':
                setlogpage(false)
                break
            case 'login-tab':
                setlogpage(true)
                break

        }

    }
    // console.log(`${process.env.REACT_APP_BACKEND_URL}/auth/register`);


    return (
        <div className="container p-2">
            {/* <div className="h2">Login</div> */}
            <div className=" d-flex justify-content-around border rounded">
                <div className={` p-1 container-fluid ${logpage ? '' : 'text-bg-info'} text-center`} onClick={(e) => handletabstate(e)}>
                    <h3 className='register-tab'>Register</h3>
                </div>
                <div className={`p-1 container-fluid login-tab text-center ${logpage ? 'text-bg-info' : ''}`} onClick={(e) => handletabstate(e)}>
                    <h3 className='login-tab'>Login</h3>
                </div>
            </div>
            <div className="d-flex m-3 login-page-container">
                {logpage ? <Loginform /> : <Registerform />}
            </div>

        </div>
    )
}

export default Login