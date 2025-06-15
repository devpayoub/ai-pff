import React from "react"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import {supabase} from '@/services/subabaseClient'
function QuestionList( { formData} ) {
  const [loading,setLoading]=useState(false);
  const [questionList,setQuestionList]=useState([]);
  const hasGenerated = useRef(false);

  
  useEffect(() => {
    if (formData && !hasGenerated.current) {
      hasGenerated.current = true;
      //GenerateQuestionList();
    }
  }, [formData]);
  

  const GenerateQuestionList=async()=>{
    setLoading(true);
    try{
    const result=await axios.post("/api/ai-model",{
      ...formData
    })
    console.log(result.data.content);
    const Content=result.data.content;
    const FINAL_CONTENT = Content
    .replace(/```json\n?/g, "")
    .replace(/```/g, "")
    
    setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
    setLoading(false);
    }catch(e)
    {
      toast('Server Error. Try Again !')
      setLoading(false);
    }
  }

  const onFinish= async() =>{

    const { data, error } = await supabase
  .from('Interviews')
  .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
  ])
  .select()



  }


  return (
    <div>
      {loading &&
        <div className="p-5 mt-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">Our AI is crafting personalized questions based on your job description</p>
          </div>
        </div>
      }
      {questionList?.length>0 &&
      <div>
      <QuestionListContainer questionList={questionList}/>
       </div>

            }
            <div className="flex justify-end mt-10">
              <Button onClick={()=> onFinish()}>
                Finish
              </Button>
            </div>
            
    </div>
  )
}

export default QuestionList
