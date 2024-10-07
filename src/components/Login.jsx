import {React,useState} from 'react'
import logo from '../assets/logo.png'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';




function Login() {
 const [username,setUsername]=useState('');
 const[password,setPassword]=useState('');
 const[message,setmessage]=useState('');
 const UsernameRegex = /^@([A-Za-z0-9_]{1,15})$/;
 const navigate=useNavigate();


 const Login =()=>{
    setmessage('');
    if(username === ''){
        setmessage('يجب ادخال اسم المستخدم');
    }else if(!UsernameRegex.test(username)){
        setmessage('@ يجب ان يبدأ اسم المستخدم بـ ');
    }else if(password === ''){
        setmessage('يجب ادخال كلمة المرور');
    }else if(password.length <= 6){
        setmessage('يجب ان تحتوي كلمة المرور على اكثر من 6 خانات');
    }else{
        axios.get('https://6703ef81ab8a8f89273247ca.mockapi.io/user')
          .then(function (response) {
            console.log(response);

            let user=response.data.find(item=>item.username === username);
            console.log(user);
            
        
            if(!user){
                  setmessage(' !! الحساب غير مسجل ');  
                }else{
                    if(user.password !== password){
                        setmessage('كلمة المرور غير صحيحة !');
                    }else{
                    
                    localStorage.setItem('id',user.id);
                    localStorage.setItem('username', user.username); 
                    localStorage.setItem('name', user.name); 
                    navigate('/Home')}
                }

          })
          .catch(function (error) {
            console.log(error);
          })

    }
 }


  return (
    <div className="  bg-black  flex justify-center flex-row-reverse items-center h-screen">
    {/* <!-- Left: Image --> */}
<div className="w-1/2 h-screen hidden lg:block ">
  <img src={logo} alt="Placeholder Image" className="object-cover w-full h-full"/>
</div>
{/* <!-- Right: Login Form --> */}
<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 text-right bg-black text-white">
  <h1 className="text-2xl font-semibold mb-4 ">تسجيل دخول</h1>
   <h1 className='text-[red] text-lg'>{message}</h1>
    {/* <!-- Username Input --> */}
    <div className="mb-4">
      <label htmlFor="username" className="block  text-white">اسم المستخدم</label>
      <input type="text" id="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} required placeholder='اسم المستخدم @' name="username" className="w-full text-black text-right border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
    </div>
    {/* <!-- Password Input --> */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-white">كلمة المرور</label>
      <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='كلمة المرور' required  name="password" className="w-full text-black text-right border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
    </div>
 
   
    {/* <!-- Login Button --> */}
    <button type="submit"  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" onClick={Login}>تسجيل</button>

  {/* <!-- Sign up  Link --> */}
  <div className="mt-6 text-blue-500 text-center flex  items-center  flex-row-reverse">
    <p className="text-white  text-md"> ليس لديك حساب؟</p> <button className='bg-none p-3 text-blue hover:bg-[lightgray] font-bold rounded-lg'> <Link to={'/'}>تسجيل </Link></button> 
  </div>
</div>

</div>
  )
}

export default Login