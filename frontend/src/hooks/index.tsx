import { useState,useEffect } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
export interface blog {
    "id": number,
    "title":string,
    "content":string,
    "author": {
        "name": string,
    }
}

export const useBlog = ({id}:{id:string}) => {
    const [loading,setloading] = useState(true);
    const [blog,setblog] = useState<blog>();
    
    useEffect(()=> {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
            Authorization : JSON.parse(localStorage.getItem('token')!).token
            }
        })
        .then(Response =>{
            setblog(Response.data.blog);
            setloading(false);
        })
    },[id]);
    return {
        loading,
        blog
    }
}

export const useBlogs = ()=> {
const [loading,setloading] = useState(true);
const [blogs,setblogs] = useState<blog[]>([]);

useEffect(()=> {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
        headers: {
        Authorization : JSON.parse(localStorage.getItem('token')!).token
        
        }
    })
    .then(Response =>{
        setblogs(Response.data.blogs);
        setloading(false);
    })
});
return {
    loading,
    blogs
}
}