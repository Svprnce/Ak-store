// import {useDispatch} from 'react-redux'
// import { setlogoutstate } from '../src/app/slices/userSlice';
import { fetchlogout } from './fetch';


export const logout = (e)=>{
    localStorage.removeItem('akuser')
    fetchlogout().then((res)=>{
    })
}