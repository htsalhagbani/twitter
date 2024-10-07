import {React,useState} from 'react'
import logo from '../assets/logo.png'
import { RxAvatar } from "react-icons/rx";
import { GoShareAndroid } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import person from '../assets/person.jfif'
import { useNavigate ,Link } from 'react-router-dom';




function Sidebar() {
const[showlogout,setshowlogout]=useState(false);
const navigate=useNavigate();

const showLogout=()=>{
    setshowlogout(true);
}
const notshow=()=>{
    setshowlogout(false);
}

const logout =()=>{
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    navigate('/');
}

  return (
<div className=' w-[20%] h-full bg-[green] flex flex-col  fixed right-0'>
    <div className='bg-[black] h-[80%] flex flex-col items-end max-sm:items-center  '>
        <img src={logo}  className='w-[5vw] h-[10vh] rounded-full max-sm:w-[100%] '/>
      <button   onClick={() => navigate('/Home')}  className='flex justify-center items-center  hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
      <p className="max-sm:hidden text-3xl text-white mr-5 ">الرئيسية</p> 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className="h-8 w-8 ">
       <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
          </svg>
          </button>       
          <button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
          <p className="max-sm:hidden text-3xl text-white mr-5">استكشف</p>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className=" h-8 w-8">
          <path fillRule="evenodd"  d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"  clipRule="evenodd"></path>
        </svg>
</button>

<button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
<p className="max-sm:hidden text-3xl text-white mr-5">التنبيهات</p> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className="h-8 w-8 ">
          <path fillRule="evenodd" d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z" clipRule="evenodd"></path>
        </svg>

</button>

<button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
<p className="max-sm:hidden text-3xl text-white mr-5">الرسائل</p> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white"  className="h-8 w-8 ">
          <path fillRule="evenodd" d="M26.35 6H5.65A3.66 3.66 0 0 0 2 9.65v12.7A3.66 3.66 0 0 0 5.65 26h20.7A3.66 3.66 0 0 0 30 22.35V9.65A3.66 3.66 0 0 0 26.35 6zM28 22.35A1.65 1.65 0 0 1 26.35 24H5.65A1.65 1.65 0 0 1 4 22.35V9.65A1.65 1.65 0 0 1 5.65 8h20.7A1.65 1.65 0 0 1 28 9.65z"/><path d="M25.49 9.14 16 14.83 6.51 9.14a1 1 0 1 0-1 1.72l10 6a1 1 0 0 0 1 0l10-6a1 1 0 0 0-1-1.72z" clipRule="evenodd"></path>
        </svg>
</button>


<button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
<p className="max-sm:hidden text-3xl text-white mr-5">Gork</p>  
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className="h-8 w-8 ">
          <path fillRule="evenodd" d="M6 2h12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4zm.643 15.8l8.109-11.58h2.515L9.158 17.8H6.643z" clipRule="evenodd"></path>
        </svg>
       </button>


       <button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
       <p className="max-sm:hidden text-3xl text-white mr-5">المجتمعات</p>  
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className="h-8 w-8 ">
          <path fillRule="evenodd" d="M7.501 19.917L7.471 21H.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977.963 0 1.95.212 2.87.672-.444.478-.851 1.03-1.212 1.656-.507-.204-1.054-.329-1.658-.329-2.767 0-4.57 2.223-4.938 6.004H7.56c-.023.302-.05.599-.059.917zm15.998.056L23.528 21H9.472l.029-1.027c.184-6.618 3.736-8.977 7-8.977s6.816 2.358 7 8.977zM21.437 19c-.367-3.781-2.17-6.004-4.938-6.004s-4.57 2.223-4.938 6.004h9.875zm-4.938-9c-.799 0-1.527-.279-2.116-.73-.836-.64-1.384-1.638-1.384-2.77 0-1.93 1.567-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.132-.548 2.13-1.384 2.77-.589.451-1.317.73-2.116.73zm-1.5-3.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5-.673-1.5-1.5-1.5-1.5.673-1.5 1.5zM7.5 3C9.433 3 11 4.57 11 6.5S9.433 10 7.5 10 4 8.43 4 6.5 5.567 3 7.5 3zm0 2C6.673 5 6 5.673 6 6.5S6.673 8 7.5 8 9 7.327 9 6.5 8.327 5 7.5 5z" clipRule="evenodd"></path>
        </svg>
      </button>

      <button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
      <p className="max-sm:hidden text-3xl text-white mr-5"> Premium</p>  
       <img src={logo} className='w-[2vw] h-[5vh]  rounded-full max-sm:w-full max-sm:h-[6vh]'/>
</button>

{/* <Link to={'/Profile'}> */}
<button    onClick={() => navigate('/Profile')} 
 className='flex justify-center items-center  hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
<p className="max-sm:hidden text-3xl text-white " > الملف الشخصي</p> 
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className="h-8 w-8  ">
          <path fillRule="evenodd" d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z" clipRule="evenodd"></path>
        </svg>
      </button>
      {/* </Link> */}

      <button className='flex justify-center items-center hover:bg-[lightgray] p-3 max-sm:p-1 rounded-full'>
      <p className="max-sm:hidden text-3xl text-white mr-5">المزيد</p> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"  className="h-8 w-8 ">
          <path fillRule="evenodd" d="M3.75 12c0-4.56 3.69-8.25 8.25-8.25s8.25 3.69 8.25 8.25-3.69 8.25-8.25 8.25S3.75 16.56 3.75 12zM12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-4.75 11.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25S6 11.31 6 12s.56 1.25 1.25 1.25zm9.5 0c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25zM13.25 12c0 .69-.56 1.25-1.25 1.25s-1.25-.56-1.25-1.25.56-1.25 1.25-1.25 1.25.56 1.25 1.25z" clipRule="evenodd"></path>
        </svg>
</button>

<button className='flex justify-center items-center bg-blue-700 hover:bg-[lightgray] p-4 max-sm:p-1 max-sm:mt-2 rounded-3xl w-[80%] max-sm:w-[80%]  text-white text-2xl font-bold'>
   <span className='max-sm:hidden'> نشر</span> <span className='md:hidden'><GoShareAndroid />
   </span>
</button>
<button className='md:hidden bg-transparent rounded-full p-1  mt-2  flex justify-center items-center hover:bg-[lightgray]'  onClick={logout}>
<IoIosLogOut  className='w-8 h-8 text-[red]'/>

    </button>
    

    

    </div>
    <div className='bg-black h-[20%] flex  justify-end max-sm:justify-center items-end max-sm:items-center'>
   <button className='flex  flex-row-reverse relative justify-between  max-sm:justify-center w-[80%] h-[50%] mb-5  rounded-full items-center'  onMouseEnter={showLogout} onMouseLeave={notshow} >
<div className='flex w-[60%] max-sm:w-full flex-row-reverse items-center justify-evenly' >
    {/* <img src={person} className='w-[4vw] h-[8vh] rounded-full rounded-full text-white max-sm:w-full max-sm:h-[100%]'/> */}
    {/* <RxAvatar  className='w-[4vw] h-[8vh] rounded-full text-white max-sm:w-full max-sm:h-[100%]'/> */}
    <div className="avatar">
  <div className="w-[4vw] h-[9vh] rounded-full text-white max-sm:w-full max-sm:h-[100%]'">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
   </div>
    <p className='text-white text-xl font-bold max-sm:hidden'>{localStorage.getItem('username')}</p>
</div>

<div className='flex w-[40%] justify-start max-sm:hidden'>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 ml-10 max-sm:hidden  text-white'>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>  
    </div>
   </button>

   {showlogout &&(
    <>
   <div className='absolute max-sm:hidden left-8 flex justify-center items-center bottom-[80px] z-50 h-20 p-4 bg-[#4b4646] rounded-xl' onMouseEnter={showLogout} onMouseLeave={notshow}>
   <button
       className='bg-black text-white p-3  hover:bg-[red] text-lg font-bold rounded-2xl'
       onClick={logout}
   >
       <IoIosLogOut  className='w-8 h-8 text-[white]'/>

   </button>
</div>

    </>
   )}
    </div>
    {/* main div black */}
    </div>
    
  )
}

export default Sidebar;