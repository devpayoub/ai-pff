'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

function FormContainer({ formData, onHandelInputChange ,GoToNext}) {
  const toggleInterviewType = title => {
    const current = formData.type || []
    const updated = current.includes(title)
      ? current.filter(t => t !== title)
      : [...current, title]

    onHandelInputChange('type', updated)
  }

  return (
    <div className="p-5 mt-5 bg-white rounded-2xl">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="Enter Job Position"
          className="mt-2"
          value={formData.jobPosition}
          onChange={e => onHandelInputChange('jobPosition', e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter Job Description"
          className="h-[200px] mt-2"
          value={formData.jobDescription}
          onChange={e => onHandelInputChange('jobDescription', e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          value={formData.interviewDuration}
          onValueChange={value => onHandelInputChange('interviewDuration', value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleInterviewType(item.title)}
              className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border border-gray-300 rounded-2xl hover:bg-secondary ${
                formData.type.includes(item.title)
                  ? 'bg-blue-50 text-primary'
                  : ''
              }`}
            >
              <item.icon className="w-4 h-5" />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex justify-end" onClick={()=>GoToNext()}>
        <Button>
          Generate Question <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default FormContainer
