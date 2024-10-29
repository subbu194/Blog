import { ChangeEvent } from "react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Signupinput } from "@subbu194/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const Auth = ({type}:{type:"signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<Signupinput>({
        email: "",
        password: "",
        name: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token",JSON.stringify(jwt));
            navigate("/blogs");
        } 
        catch(e) {
            alert("here error while signing up")
        }
    }

    return(
<div className="h-screen flex justify-center flex-col">
    <div className="flex justify-center">
        <div className="px-10">
        
        <div className="px-10">
            <div className=" text-3xl font-extrabold">
            {type === "signin" ? "Login to you'r account !" : "Create an account "}
            </div>
            <div className="text-slate-400">
            {type === "signin" ? "don't have an account ?" : "Alrefy have an account ?"}
                <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
                </Link> 
            </div>
        </div>
        <div>
       {type === "signup" ?  <LabelInput label="Name" placeholder="john...." onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                name:e.target.value
            })
        }}/> : null}
        <LabelInput label="E_mail" placeholder="abcd@gmail.com" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                email:e.target.value
            })
        }}/>
                <LabelInput label="Password" type={"password"} placeholder="Abcd12@#$" onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password:e.target.value
            })
        }}/>
        <button type="button" onClick={sendRequest} className=" w-full mt-6 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ">{type === "signup" ? "Sign up" : "Sign in"}</button>
        </div>
            
        </div>
    </div>    
</div>
    )
}

interface LabelinputType {
    label: string;
    placeholder: string;
    onChange: (e:ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelInput({label, placeholder, onChange, type}: LabelinputType){
       return(
    <div>
        <div className="mb-4">
          <label className="block mb-2 text-lg text-black font-semibold pt-3">{label}</label>
          <input onChange={onChange} type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
      
    ) 
}