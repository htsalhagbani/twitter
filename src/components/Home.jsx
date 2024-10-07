import {React,useEffect,useState} from 'react'
import Sidebar from './Sidebar'
import { RxAvatar } from "react-icons/rx";
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import Modal from './Modal'; 





function Home() {
    const[tweet,settweet]=useState('');
    const[msg,setmsg]=useState('');
    const[alltweet,setalltweet]=useState([]);
    const[delbox,setdelbox]=useState(false);
    const[active,setactive]=useState('');
    const[tweetid,settweetid]=useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [tweetIdToDelete, setTweetIdToDelete] = useState(null);

    const openModal = (id) => {
        setdelbox('');
        setTweetIdToDelete(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTweetIdToDelete(null);
    };



    const showdel=(id,tweetid)=>{
        // console.log("id"+id);
        // console.log(localStorage.getItem('id'));
        
       if(localStorage.getItem('id')=== id){
        settweetid(tweetid);
        setactive(id);
        setdelbox(true);
       }

    }


    const AddTweets =()=>{
        setmsg('');
        if(tweet === ''){
            setmsg('الرجاء ادخال التغريدة');
        }else {
            axios.post('https://6703ef81ab8a8f89273247ca.mockapi.io/tweets', {
                userId: localStorage.getItem('id'),
                username: localStorage.getItem('username'),
                name:localStorage.getItem('name'),
                tweet:tweet,
                like:[]
              })
              .then(function (response) {
                // console.log(response);
                settweet('');

              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    const Alltweet=()=>{
        axios.get('https://6703ef81ab8a8f89273247ca.mockapi.io/tweets')
          .then(function (response) {
            // console.log(response);
            let lasrfirst=response.data.sort((a,b)=>b.id-a.id);
            setalltweet(lasrfirst);
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    const deleteTweet = async () => {
        try {
            await axios.delete(`https://6703ef81ab8a8f89273247ca.mockapi.io/tweets/${tweetIdToDelete}`);
            setalltweet(alltweet.filter((item) => item.id !== tweetIdToDelete));
            closeModal();
        } catch (error) {
            console.error('Error deleting tweet:', error);
        }
    };

    const handleLike = async (id, likedBy) => {
        const userId = localStorage.getItem('id');
        
        const newLikedBy = likedBy.includes(userId)
            ? likedBy.filter(uid => uid !== userId) 
            : [...likedBy, userId]; 
    
        try {
            const response = await axios.put(`https://6703ef81ab8a8f89273247ca.mockapi.io/tweets/${id}`, {
                like: newLikedBy
            });
    
            setalltweet(alltweet.map(tweet => tweet.id === id ? response.data : tweet));
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };
    
    

    useEffect(()=>{
        Alltweet();        
    },[tweet])



  return (
    <div className='flex  flex-row-reverse md:justify-end     w-full'>
 
    <Sidebar/>
  
    {/* box in center  */}
    <div className='flex  flex-row-reverse bg-[black] min-h-screen max-sm:flex-col max-sm:overflow-y-auto w-[80%] max-sm:mr-[20%]' >
    <div className=' w-[60%] flex flex-col border border-[gray]  max-sm:border-none max-sm:w-[100%]'>
<div className='bg-[#737373] w-full h-[10vh] max-sm:h-[8vh] sticky top-0 z-10'>
    <button className='w-[50%] border border-black text-center text-xl font-bold h-full hover:bg-[gray]'>ForYou</button>
    <button className='w-[50%] border border-black text-center text-xl font-bold h-full hover:bg-[gray]'>Following</button>
</div>
<div className='flex flex-col items-center  border border-gray-700  w-full h-[30vh] max-sm:h-[30vh] max-sm:w-full'>
<div className='flex  flex-row-reverse items-center h-full w-full mr-4 max-sm:mr-1'>
<div className="avatar md:ml-3">
  <div className="w-[5vw] h-[12vh] max-sm:w-[16vw] ml-1 max-sm:h-[10vh] rounded-full text-white ">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
   </div>
   <div className='flex flex-col w-full h-full items-end justify-center'>
<textarea className='h-[60%] w-[80%] text-wrap text-end max-sm:h-[40%] max-sm:w-[95%]' type='text'  placeholder='ماذا يحدث؟' value={tweet} onChange={(e)=>{settweet(e.target.value)}}/>
<h1 className='text-[red]'>{msg}</h1>
</div>
</div>

<div className='flex flex-row-reverse  h-[40%] w-[80%] justify-between items-center max-sm:w-full'>
    <div className='flex flex-row-reverse'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-7 w-7 ml-5 max-sm:w-5 max-sm:h-5 max-sm:ml-1'>
        <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-7 w-7 ml-5 max-sm:w-5 max-sm:h-5 max-sm:ml-1'>
        <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-7 w-7 ml-5 max-sm:w-5 max-sm:h-5 max-sm:ml-1'>
        <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-7 w-7 ml-5 max-sm:w-5 max-sm:h-5 max-sm:ml-1'>
        <path  d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z" />
      </svg> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-7 w-7 ml-5 max-sm:w-5 max-sm:h-5 max-sm:ml-1'>
        <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z" />
      </svg> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-7 w-7 ml-5 max-sm:w-5 max-sm:h-5 max-sm:ml-1'>
        <path  d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z" />
      </svg>
      </div>
    <button 
    className=" h-8 w-24 ml-12 max-sm:ml-5 text-xl   text-white bg-sky-500 hover:bg-sky-600 rounded-3xl"
    onClick={AddTweets}
    >نشر</button>

    </div>

   

</div>

 {/* user tweet box  */}
 <div className='  w-full h-full  flex-grow flex flex-col '>

{/* tweets here ! */}
{alltweet.map((item ,index)=>{
    return ( 
 <div key={index} className='  w-full border border-gray-600  max-sm:h-[30vh] flex flex-col items-end justify-between'>
    {/* header tweet */}
    <div className='flex  max-sm:mt-0 mt-2  w-full flex-row-reverse  relative items-center justify-between'>
   <div className='flex flex-row-reverse items-center  mb-3 '>
   <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"  className='w-12 h-12  rounded-full text-white max-sm:w-12  max-sm:h-[100%]'/>
<h1 className='text-white text-2xl font-bold max-sm:text-lg md:mr-3'>{item.name}</h1>
<h1 className='text-[gray] text-lg mr-3 max-sm:mr-1'>{item.username}</h1>
   </div>
<svg 
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5 w-5 ml-2"
        onClick={()=>{showdel(item.userId,item.id)}}
        style={{ cursor: 'pointer' }} 
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
        />
      </svg>

      {delbox && item.userId === active&& item.id === tweetid &&(
        <>
        <button className='bg-gray-700 flex items-end rounded-lg absolute left-2 top-10' >
        <MdOutlineDeleteOutline className='text-[red] w-10 h-10 max-sm:w-8 max-sm:h-8' onClick={() => openModal(item.id)} />
        </button>
        </>
      )}
  
    </div>
    <div className='flex justify-end mb-4 max-sm:mb-2  text-white text-right  mr-3 w-[90%]'>
    {item.tweet}
    </div>

  <div className='flex  flex-row-reverse mb-2 w-full justify-around text-gray-500'>
    <div className='flex items-center hover:text-[blue]'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
      </svg>
      <span >1.2k</span>
    </div>
    <div className='flex items-center hover:text-[blue]'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path  d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
      </svg>
      <span >8k</span>
    </div>
    <div className='flex items-center  ' style={{ color: (item.like && item.like.includes(localStorage.getItem('id'))) ? 'red' : 'gray' }}
    >
    <button
             onClick={() => handleLike(item.id, item.like || [])} 
            >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
      </svg>
        </button>
      <span >2k</span>
    </div>
    <div className='flex items-center hover:text-[blue]'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
      </svg>
      <span >200K</span>
    </div>
    <div className='flex items-center '>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 hover:text-[blue]'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
      </svg>  
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 hover:text-[blue]'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
      </svg>

    </div>
  </div>

</div>);
})}

<Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={deleteTweet}
                message="هل متاكد من حذف التغريدة؟"
            />

</div>



    </div>
  
   

 {/* leftside bar */}
 <div className='bg-[black] w-[30%]  max-sm:hidden h-screen md:h-screen max-sm:w-full md:fixed md:left-0 flex flex-col items-center gap-3'>
<input placeholder='بحث' type='text' className='w-[80%] border border-white rounded-full h-[6%] text-right p-5 mt-2 bg-black'/>
<div className='border border-gray rounded-2xl text-white pr-3 w-[80%] max-sm:w-full  h-[40%] flex flex-col items-end justify-evenly'>
    <h1 className='text-2xl font-bold max-sm:text-lg'>Permioum الاشتراكات في </h1>
    <p className='text-xl text-wrap text-right max-sm:text-lg'>اشترك لاكتشاف ميزات جديدة وفي حال كنت مؤهلًا، ستتسلّم حصة من إيرادات الإعلانات</p>
<button className='text-xl p-4 bg-[blue] text-white max-sm:p-2 rounded-md'>اشترك الان </button>
</div>
<div className='border border-gray rounded-2xl max-sm:mb-2 text-white w-[80%] max-sm:w-full h-[50%] flex flex-col  item-end text-right'>
    <h1 className='text-3xl font-bold p-5 max-sm:text-lg'>ماذا يحدث</h1>
    <p className='text-2xl font-bold p-3 text-[blue] max-sm:text-lg'> الملك سلمان بن عبدالعزيز# </p>
    <p className='text-md text-[gray] p-3'>المتداول مع
      <span className='text-[blue]'> #خادم_الحرمين_الشريفين،</span>  
         الفحوصات الطبيه</p>
         <p className='text-2xl font-bold p-3 text-[blue] max-sm:text-lg'> ختام كاريزما# </p>
         <p className='text-md text-[gray] p-3'>المتداول مع
      <span className='text-[blue]'> عبدالله الحربي , سلطان الثقل </span>  </p>


</div>
 </div>
    </div>
    </div>
  )
}

export default Home