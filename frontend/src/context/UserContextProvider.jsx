import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import axios from 'axios'

export default function UserContextProvider({children}) {
    let [cartList, setCartList] = useState('')
    let [flag, setFlag] = useState(false)
    let [adminflag, setAdminFlag] = useState(false)
    let [haveAdmin, setHaveAdmin] = useState(false)
    
    let [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        isAuthenized : !!localStorage.getItem('token'),
        username: ''
    })
    let [list, setList] = useState({
        cartList: '',
        wlist : '',
        orderList: ''
    })
    // let [adminAuth, setAdminAuth] = useState({
    //     adminToken: localStorage.getItem('adminToken') || null,
    //     isAuthenized : !!localStorage.getItem('adminToken'),
    //     adminName: ''
    // })

    let userLogin = async (email, password)=>{
        // console.log(email)
        // console.log(password)
    let result = await axios.post('https://actl.co.in/pritam/userlogin', {email, password})
    // console.log(result)
    if(result.data.isMatch){
        localStorage.setItem('token', result.data.token)
        setAuth({token:result.data.token, isAuthenized: true, username: result.data.result[0] })
        setFlag(true)
        return true
    }else{
        return false
    }
    }

    // let adminLogin = async (email, password)=>{
    // let result = await axios.post('http://localhost:3000/api/adminLogin', {email, password})
    // if(result.data.isMatch){
    //     localStorage.setItem('adminToken', result.data.token)
    //     setAdminAuth({adminToken:result.data.token, isAuthenized: true, adminName: result.data.result[0] })
    //     setHaveAdmin(true)
    //     return true
    // }else{
    //     return false
    // }
    // }

    let logout = ()=>{
        localStorage.removeItem('token')
        setAuth({token: null, isAuthenized: false, username: '' })
        // window.location.reload()
    }
    // let adminLogout = ()=>{
    //     localStorage.removeItem('adminToken')
    //     setAdminAuth({adminToken: null, isAuthenized: false, adminName: '' })
    // }

    let profile = async ()=>{
       try {
        let token = localStorage.getItem('token')
        if(token){
            let result = await axios.post('https://actl.co.in/pritam/userverify',
                {},
                {
                  headers: { 'Authorization': `Bearer ${token}` },
                })
                // console.log(result)
            if(result.data.email){
                let username = result.data.email.split('@')[0]
                setAuth((prevAuth)=> ({...prevAuth, username:result.data}))
            }
            setFlag(true)
        }
       } catch (error) {
        logout()
       }
    }
    // let adminProfile = async ()=>{
    //    try {
    //     let adminToken = localStorage.getItem('adminToken')
    //     if(adminToken){
    //         let result = await axios.post('http://localhost:3000/api/adminVerify',
    //             {},
    //             {
    //               headers: { 'Authorization': `Bearer ${adminToken}` },
    //             })
    //         if(result.data.email){
    //             setAdminAuth((prevAuth)=> ({...prevAuth, adminName:result.data}))
    //             setHaveAdmin(true)
    //         }
    //     }
    //    } catch (error) {
    //     // adminLogout()
    //    }
    // }

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token){
            // setFlag(true)
            profile()
        }else{
            logout()
        }
        

    }, [])
// console.log(flag)
    // let paymentStatusUpdate = async (flag)=>{
    //     if(flag){
    //         let paymentStatus = "paid"
    //         let email = adminAuth.adminName.email
    //         let result  = await axios.put(`http://localhost:3000/api/updatepaymentstatus/${email}/${paymentStatus}`)
    //         if(result.data == true){
    //             return true
    //         }else{
    //             return false
    //         }
    //     }
    // }

    // let checkPayment = async (email)=>{
    //     let result = await axios.get(`http://localhost:3000/api/checkpaymentstatus/${email}`)
    //     if(result.data == true){
    //         return true
    //     }else{
    //         return false
    //     }
    // }

    // console.log(auth)
  return (
   <UserContext.Provider value={{auth, userLogin, logout,list, setList, cartList, setCartList, flag, setFlag, haveAdmin, setHaveAdmin, adminflag, setAdminFlag}}>
    {children}
   </UserContext.Provider>
  )
}