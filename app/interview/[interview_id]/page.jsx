'use client'
import React, { useContext, useEffect,useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, Info, Loader2Icon, Settings, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/subabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

function Interview() {

    const { interview_id } = useParams();
    console.log("Interview ID:", interview_id);

    const [interviewData,setInterviewData]=useState();
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState();
    const [InterviewInfo, setInterviewInfo]=useContext(InterviewDataContext);
    const router = useRouter();
    useEffect(() => { 
        interview_id && GetInterviewDetails();
     }, [interview_id]);

    const GetInterviewDetails = async() => {
        setLoading(true);
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select("jobPosition,jobDescription,duration,type,questionList")
            .eq('interview_id', interview_id)
        setInterviewData(Interviews[0]);
        setLoading(false);

        if(Interviews.length === 0) {
            toast("Interview not found. Please check the link and try again.");
            return;
        }
    }

    const onJoinInterview = async () => {
        setLoading(true);
        let { data: Interviews, error } = await supabase
            .from('Interviews')
            .select('*')
            .eq('interview_id', interview_id)
        
        console.log(Interviews[0]);
        setInterviewInfo({
            userName:userName,
            interviewData:Interviews[0]
        });

        router.push('/interview/' + interview_id + '/start');
        setLoading(false);
    }

    return (
        <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7 '>
            <div className='bg-white flex flex-col items-center 
                justify-center border rounded-lg shadow-md
                p-7 lg:px-33 xl:px-32 mb-20 pb-10'>

                <Image src="/logo.webp" alt="logo" width={200} height={100} className="w-[140px]" />
                <h2 className='mt-2 text-sm text-gray-600'>AI-Powered Interview Platform</h2>

                <Image src="/interview.png" alt="interview" width={500} height={500} className='w-[300px] md:w-[380px] my-6' />

                <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
                <h2 className='flex gap-2 items-center text-gray-500 mt-3'>
                    <Calendar className='w-4 h-4' />
                    {interviewData?.questionList?.length} Questions
                    <Clock className='w-4 h-4' />
                    {interviewData?.duration} minutes
                </h2>

                <div className='p-4 mt-6'>
                    <h2 className='text-sm mb-1 w-full sm:w-[500px]'>Enter your full name</h2>
                    <Input placeholder="e.g., John Smith" onChange={(event)=>setUserName(event.target.value)} />
                </div>

                <div className='p-4 mt-6 bg-blue-100 text-primary flex gap-4 rounded-md'>
                    <Info className="mt-1" />
                    <div>
                        <h2 className='font-bold mb-1'>Before you begin</h2>
                        <ul className='list-disc ml-5 text-sm space-y-1'>
                            <li>Ensure you have a stable internet connection</li>
                            <li>Test your camera and microphone</li>
                            <li>Find a quiet place for the interview</li>
                        </ul>
                    </div>
                </div>

                <Button className='mt-6 w-full font-bold sm:w-[500px]'
                    disabled={loading || !userName}
                    onClick={()=>onJoinInterview()}>
                    <Video className="w-4 h-4" />
                    {loading && <Loader2Icon/>}
                    Join Interview</Button>

                <button className='mt-5 text-sm text-gray-600 flex items-center gap-2 hover:underline'>
                    <Settings className="w-4 h-4" />
                    Test Audio & Video
                </button>
            </div>
        </div>
    )
}

export default Interview
