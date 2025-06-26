'use client'
import { InterviewDataContext } from "@/context/InterviewDataContext"
import React, { useContext, useEffect } from "react"
import {Timer} from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web';

function StartInterview() {

  const{interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  useEffect(()=>{
    interviewInfo && startCall();
  },[interviewInfo])

  const startCall=()=>{
    let quistionList;
    interviewInfo?.interviewData?.questionList.forEach((item,index)=>(
      questionList=item?.question+","+questionList
    ));
    console.log(questionList);
  }
  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Sesstion
        <span className="flex gap-2 items-center">
          <Timer/>
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex_col gap-3 items-center justify-center">
          <Image src={"/v1.webp"} alt="v1"
          width={100}
          height={100}
          className="w-[60px] h-[60px] rounded-full object-cover"/>
          <h2>AI Recruiter</h2>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex_col gap-3 items-center justify-center">
         <h2 className='text-2xl bg-primary text-white p-3 rounded full px-5'>{interviewInfo?.userName[0]}</h2>
        <h2>{interviewInfo?.userName[0]}</h2>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer'/>
        <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer'/>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">Iterview in Progress....</h2>
    </div>
  )
}
//3:48:44
export default StartInterview