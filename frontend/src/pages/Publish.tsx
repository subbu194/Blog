import { Appbar } from "../components/AppBAr"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { ChangeEvent } from "react"
export const Publish = () => {
    const [title,settitle] = useState("");
    const [content,setcontent] = useState("");
    const navigate = useNavigate();
    return (
        <div>

        <Appbar/>
        <div className="w-full w-9/12">
        <div className="flex justify-center w-full pt-10">
<div className="mx-w-screen-lg w-9/12">
    <input onChange={(e)=>{
        settitle(e.target.value);
    }} type="text" id="large-input" className="w-full block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" placeholder="Title"/>
</div>
</div>
<div className="pt-10">
       <TextEditor onChange={(e)=>{
        setcontent(e.target.value);
    }}/>
   <div  className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2 w-9/12">
   <button onClick={async ()=>{
                   const response  = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content
                    },{
                        headers: {
                            Authorization: JSON.parse(localStorage.getItem('token')!).token
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
               }}type="submit" className=" inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Publish Post
           </button>
   </div>
       </div>
       </div>
</div>

    )
}

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return (
  <div><div className="flex justify-center">
     <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50  w-9/12">
         <div className="px-4 py-2 bg-white rounded-t-lg ">
             <label  className="sr-only">Content</label>
             <textarea onChange={onChange} id="comment" rows={4} className=" focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0" placeholder="Write a content..." required ></textarea>
         </div>
         <div className="flex items-center justify-between px-3 py-2 border-t ">
  
             <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                 {/* <button onClick={()=>{
                      axios.post(`${BACKEND_URL}/api/v1/blog`,{
                      title,
                      description
                      })
                 }}type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                 Publish Post
             </button> */}
             </div>
         </div>
     </div>
     </div>
  </div>
  
  
    )
  }


