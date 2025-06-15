"use client"
import React from 'react'
import { useState } from 'react'
import { Video } from 'lucide-react'
import { Button } from '@/components/ui/button';

function LatestInterviewsList() {
    const [latestInterviews, setInterviewList] = useState([]);
    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

            {latestInterviews?.length == 0 && 
            <div className='p-5 flex flex-col gap-3 items-center mt-5 bg-white'>
                <Video className="h-10 w-10 text-primary"/>
                <h2>You Don'y have any interviews created yet !</h2>
                <Button>+ Create New Interview</Button>
            </div>}
        </div>
    )
}

export default LatestInterviewsList
