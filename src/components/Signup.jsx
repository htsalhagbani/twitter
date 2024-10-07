import {React,useState} from 'react'
import logo from '../assets/logo.png'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';


function Signup() {
const [email,setEmail]=useState('');
const [userName,setUsername]=useState('');
const [name,setname]=useState('');
const[password,setPassword]=useState('');
const[retpassword,setRetPassword]=useState('');
const [alertMessage, setAlertMessage] = useState('');
const EmailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UsernameRegex = /^@([A-Za-z0-9_]{1,15})$/;
const navigate=useNavigate();



const Register = () => {
    setAlertMessage('');
    if (email === '') {
        setAlertMessage('يجب ادخال الايميل؟');
    }
     else if(!EmailRegex.test(email)){
        setAlertMessage('يجب ادخال الايميل بصيغة صحيحة؟');
    } else if(userName === ''){
        setAlertMessage('يجب ادخال اسم المستخدم؟');
    }else if(!UsernameRegex.test(userName)){
        setAlertMessage('يجب ادخال اسم المستخدم يبدأ ب @؟');
    }else if(name === ''){
        setAlertMessage('يجب ادخال الاسم الاول؟');
    }else if(password === ''){
        setAlertMessage('يجب ادخال كلمة المرور؟');
    }else if(password.length<=6){
        setAlertMessage('يجب ان تحتوي كلمة المرور على اكثر من 6 خانات');
    }else if(retpassword === ''){
        setAlertMessage('يجب اعادة كلمة المرور؟');
    }else if(retpassword.length<=6){
        setAlertMessage('يجب ان تحتوي كلمة المرور على اكثر من 6 خانات');
    }else if (password !== retpassword) {
            setAlertMessage('كلمات المرور لا تتطابق؟');
            return;
    } else{

    axios.get('https://6703ef81ab8a8f89273247ca.mockapi.io/user')
        .then(function (response) {
            const exist= response.data.some(item => item.email === email);
            if(exist){
                setAlertMessage('هذا الحساب موجود بالفعل');
            } else{
                axios.post('https://6703ef81ab8a8f89273247ca.mockapi.io/user', {
                    email: email,
                    username: userName,
                    name:name,
                    password:password,
                    
                    
                })
                .then(function (response) {
                    console.log(response);
                    setAlertMessage('تم التسجيل بنجاح');
                    navigate('/Login');
                })
                .catch(function (error) {
                    console.log(error);
                    setAlertMessage('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.'); 
                });
            }

  })

}
        
 


};

  return (
    // <!-- component -->
<div className="bg-black text-white flex justify-center flex-row-reverse items-center h-screen">
    {/* <!-- Left: Image --> */}
<div className="w-1/2 h-screen hidden lg:block">
  <img src={logo} alt="Placeholder Image" className="object-cover w-full h-full"/>
</div>
{/* <!-- Right: Login Form --> */}
<div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 text-right">
  <h1 className="text-2xl font-semibold mb-4">تسجيل حساب جديد</h1>
  <h1 className='text-[red]'>{ alertMessage}</h1>
   {/* <!-- Email Input --> */}
   <div className="mb-4">
      <label htmlFor="email" className="block text-white">الايميل</label>
      <input type="email" id="email" required name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="example@gmail.com" className="w-full text-right text-black border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 placeholder:'name@company.com'" autoComplete="off"/>
    </div>
    {/* <!-- Username Input --> */}
    <div className="mb-4">
      <label htmlFor="username" className="block text-white">اسم المستخدم</label>
      <input type="text" id="username" required placeholder='اسم المستخدم @' name="username" value={userName} onChange={(e)=>{setUsername(e.target.value)}} className="w-full text-right border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
    </div>
     {/* <!-- Username Input --> */}
     <div className="mb-4">
      <label htmlFor="name" className="block text-white">الاسم الاول</label>
      <input type="text" id="name" required placeholder='الاسم الاول' name="name" value={name} onChange={(e)=>{setname(e.target.value)}} className="w-full text-right border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
    </div>
    {/* <!-- Password Input --> */}
    <div className="mb-4">
      <label htmlFor="password" className="block text-white">كلمة المرور</label>
      <input type="password" id="password" placeholder='كلمة المرور' required  name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-full text-right border border-gray-300 text-black rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
    </div>
    {/* <!-- Retry Input --> */}
    <div className="mb-4">
      <label htmlFor="re-password" className="block text-white">إعادة كلمة المرور</label>
      <input type="password" id="re-password" placeholder='أعادة كلمة المرور' required name="re-password" value={retpassword} onChange={(e)=>{setRetPassword(e.target.value)}} className="w-full text-right border text-black border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off"/>
    </div>
    
    {/* <!-- Signup Button --> */}
    <button type="submit" className="bg-blue-500 md:mt-3 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full" onClick={Register}>تسجيل</button>

  {/* <!-- Login  Link --> */}
  <div className="mt-6 text-blue-500 text-center flex  items-center  flex-row-reverse">
    <p className="text-white  text-md"> هل لديك حساب؟</p> <Link className='bg-none p-3 text-blue hover:bg-[lightgray] font-bold rounded-lg' to={`/Login`}>تسجيل دخول</Link> 
  </div>
</div>
</div>
  )
}

export default Signup