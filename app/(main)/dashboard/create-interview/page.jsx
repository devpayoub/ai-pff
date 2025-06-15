'use client'
import React, { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import FormContainer from './_components/FormContainer'
import QuestionList from './_components/QuestionList'
import { toast } from 'sonner'

function CreateInterview() {
  const route = useRouter()
  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({
    jobPosition: '',
    jobDescription: '',
    interviewDuration: '',
    type: []
  })

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const onHandelInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const onGoToNext = () => {
    if (
      !formData.jobPosition ||
      !formData.jobDescription ||
      !formData.interviewDuration ||
      formData.type.length === 0
    ) {
      toast('Please enter all details!')
      return
    }
    setStep(step + 1)
  }
  


  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => route.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create Interview</h2>
      </div>
      <Progress value={step * 33.33} className="mt-5" />
      {step == 1 ? <FormContainer
        formData={formData}
        onHandelInputChange={onHandelInputChange}
        GoToNext={() => onGoToNext()}
      />
      : step == 2 ? <QuestionList formData={formData} /> : null}
    </div>
  )
}

export default CreateInterview
