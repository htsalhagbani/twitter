import {React,useEffect,useState} from 'react'
import Sidebar from './Sidebar'
import { FaArrowRight } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';




function Like() {
    const navigate=useNavigate();
    const[tweet,settweet]=useState([]);


 const faviourate=()=>{
    let userId = localStorage.getItem('id');

    axios.get(`https://6703ef81ab8a8f89273247ca.mockapi.io/tweets`)
        .then(function (response) {
            // console.log(response.data);
            
            let favoriteTweets = response.data.filter((item) => item.like.includes(userId));
            // console.log(favoriteTweets);
            
            settweet(favoriteTweets);
        })
        .catch(function (error) {
            // console.log(error);
        });
 }

 useEffect(()=>{
    faviourate();
 },[tweet])

 
 const handleLike = async (id, likedBy) => {
    const userId = localStorage.getItem('id');
    
    const newLikedBy = likedBy.includes(userId)
        ? likedBy.filter(uid => uid !== userId) 
        : [...likedBy, userId]; 

    try {
        const response = await axios.put(`https://6703ef81ab8a8f89273247ca.mockapi.io/tweets/${id}`, {
            like: newLikedBy
        });

        settweet(tweet.map(tweet => tweet.id === id ? response.data : tweet));
    } catch (error) {
        console.error('Error updating like status:', error);
    }
};


  return (
    <div className='flex  flex-row-reverse md:justify-end md:items-start     w-full'>
 
    <Sidebar/>
  
    {/* box in center  */}
    <div className='flex flex-row-reverse max-sm:flex-col max-sm:overflow-y-auto  bg-black h-fit w-[80%] max-sm:w-full' >
    <div className='flex flex-col w-[60%] border border-[gray] max-sm:h-full  min-h-screen max-sm:border-none max-sm:w-[80%]'>
    <div className='bg-transparent w-full h-[4%] max-sm:h-[6%] flex justify-end'>
    
        <button className='w-[50%] border flex justify-center  items-center border-none text-center text-white text-xl font-bold h-full hover:bg-[gray]' >
          <Link to={'/Home'} className='flex  justify-center items-center'>{localStorage.getItem('username')} <FaArrowRight className='  ml-3 text-white ' /></Link>
        </button>
    </div>

    <div className='border border-[gray] w-full flex flex-col items-end flex-grow'>
        <div className='bg-[lightgray] w-full h-[20vh] flex justify-end'>
   
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className='rounded-full w-40 h-40 md:translate-y-24 max-sm:w-20 max-sm:h-20 max-sm:translate-y-20 ' />
        </div>
        <div className='w-full mt-3 max-sm:mt-1'>
            <button className='bg-white text-black text-xl rounded-full p-3 ml-3 max-sm:text-sm max-sm:ml-1'>تعديل الملف الشخصي</button>
        </div>
        <div className='bg-[black] justify-evenly w-[80%] mt-14 max-sm:mt-2 max-sm:pr-1 max-sm:mr-1 pr-3 flex items-end mr-5 flex-col'>
            <h1 className='text-white text-lg font-bold'>{localStorage.getItem('name')}</h1>
            <h1 className='text-[gray] text-lg'>{localStorage.getItem('username')}</h1>
            <div className='flex flex-row-reverse gap-3 justify-center items-center text-[gray] text-lg'>
                <SlCalender />
                <h1>انضم في مايو ٢٠١٣</h1>
            </div>
            <div className='flex flex-row-reverse gap-4 mt-3'>
                <div className='flex flex-row-reverse'>
                    <h1 className='text-white text-xl font-bold'>193</h1>
                    <h1 className='text-[gray] text-lg'>متابَعًا</h1>
                </div>
                <div className='flex flex-row-reverse'>
                    <h1 className='text-white text-xl font-bold'>200</h1>
                    <h1 className='text-[gray] text-lg'>متابِعًا</h1>
                </div>
            </div>
        </div>
        <div className='w-full h-[20%] px-2 flex flex-row-reverse justify-between items-end max-sm:justify-center max-sm:gap-8'>
            <button className='btn bg-transparent border-none w-[10%] font-bold'>المنشورات</button>
            <button className='btn bg-transparent border-none w-[10%] font-bold'>الردود</button>
            <button className='btn bg-transparent border-none w-[10%] max-sm:hidden font-bold'>المميزة</button>
            <button className='btn bg-transparent border-none w-[10%] max-sm:hidden font-bold'>المقالات</button>
            <button className='btn bg-transparent border-none w-[10%] font-bold max-sm:hidden'>الوسائط</button>
            <button className='btn bg-transparent border-none w-[10%] font-bold'>الإعجابات</button>
        </div>
    </div>

       {/* user tweet box  */}
       <div className=' w-full h-full '>
        {tweet.map((item,index)=>{
            return(
 <div key={index} className='border border-[gray]  md:p-3 w-full h-[30vh] max-sm:h-[30vh] flex flex-col items-end'>
    {/* header tweet */}
    <div className='flex mt-1  w-full flex-row-reverse  items-center justify-between relative '>
   <div className='flex flex-row-reverse items-center mb-3 '>
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"  className='w-16 h-16  rounded-full text-white max-sm:w-12  max-sm:h-[100%]'/>
<h1 className='text-white text-2xl font-bold md:mr-2'>{item.name}</h1>
<h1 className='text-[gray] text-lg mr-3'>{item.username}</h1>
   </div>
<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5 w-5 ml-2"
        // onClick={()=>{showdel(item.id)}}
        style={{ cursor: 'pointer' }} 
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
        />
      </svg>

     
    </div>
    <div className='flex justify-end mb-4 bg-[lightgray] h-full mr-3 w-[90%]'>
   {item.tweet}
  </div>

  <div className='flex flex-row-reverse mb-2 w-full justify-around text-gray-500'>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
      </svg>
      <span >1.2k</span>
    </div>
    <div className='flex items-center ' >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path  d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
      </svg>
      <span >8k</span>
    </div>
    <div className='flex items-center' style={{ color: (item.like && item.like.includes(localStorage.getItem('id'))) ? 'red' : 'gray' }}>
    <button
              onClick={() => handleLike(item.id, item.like || [])} 

      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
      </svg>
        </button>
      <span >2.4k</span>
    </div>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
      </svg>
      <span >200K</span>
    </div>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
      </svg>  
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
      </svg>

    </div>
  </div>
</div>
);
})}


</div>
    
    
     </div>


 {/* leftside bar */}
 <div className='  w-[40%] max-sm:hidden md:max-w-[30vw] bg-[black]  h-screen md:fixed md:left-0 max-sm:w-[80%]  flex flex-col items-center gap-3'>
<input placeholder='بحث' type='text' className='w-[80%] border border-white rounded-full h-[6%] text-right p-5 mt-2 bg-black'/>
<div className='border border-gray rounded-2xl text-white pr-3 w-[80%] max-sm:w-full  h-[40%] flex flex-col items-end justify-evenly'>
    <h1 className='text-2xl font-bold'>Permioum الاشتراكات في </h1>
    <p className='text-xl text-wrap text-right'>اشترك لاكتشاف ميزات جديدة وفي حال كنت مؤهلًا، ستتسلّم حصة من إيرادات الإعلانات</p>
<button className='text-xl p-4 bg-[blue] text-white max-sm:p-2 rounded-md'>اشترك الان </button>
</div>
<div className='border border-gray rounded-2xl text-white w-[80%] max-sm:w-full h-[50%] flex flex-col  item-end text-right'>
    <h1 className='text-3xl font-bold p-5 '>ماذا يحدث</h1>
    <p className='text-2xl font-bold p-3 text-[blue]'> الملك سلمان بن عبدالعزيز# </p>
    <p className='text-md text-[gray] p-3'>المتداول مع
      <span className='text-[blue]'> #خادم_الحرمين_الشريفين،</span>  
         الفحوصات الطبيه</p>
         <p className='text-2xl font-bold p-3 text-[blue]'> ختام كاريزما# </p>
         <p className='text-md text-[gray] p-3'>المتداول مع
      <span className='text-[blue]'> عبدالله الحربي , سلطان الثقل </span>  </p>


</div>
 </div>
    </div>
    </div>
  )
}

export default Like