'use client'
import { InterviewDataContext } from "@/context/InterviewDataContext"
import React, { useContext, useEffect, useRef, useState } from "react"
import { Timer, Mic, Phone } from 'lucide-react'
import Image from 'next/image'
import Vapi from '@vapi-ai/web';
import AlertConfirmation from "./AlertConfirmation"

function StartInterview() {
  // FIXED: Use object destructuring to match the context provider
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  
  const vapiRef = useRef(null);
  const [callStatus, setCallStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('Interview Info:', interviewInfo);

    // FIXED: Prevent duplicate instances with better checking
    const initializeVapi = async () => {
      try {
        // If already initialized, don't create another instance
        if (isInitialized || vapiRef.current) {
          return;
        }

        if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
          console.error('VAPI public key not found');
          setError('VAPI configuration missing');
          return;
        }

        // Create new Vapi instance
        vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
        setIsInitialized(true);

        // Set up event listeners
        vapiRef.current.on('call-start', () => {
          console.log('Call started');
          setCallStatus('active');
          setError(null);
        });

        vapiRef.current.on('call-end', () => {
          console.log('Call ended');
          setCallStatus('ended');
        });

        vapiRef.current.on('error', (error) => {
          console.error('Vapi error:', error);
          setError(error.message);
          setCallStatus('error');
        });

      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to initialize voice assistant: ' + err.message);
        setCallStatus('error');
      }
    };

    initializeVapi();

    // FIXED: Improved cleanup function
    return () => {
      const cleanup = async () => {
        try {
          if (vapiRef.current) {
            // Stop any active calls
            if (vapiRef.current.stop) {
              await vapiRef.current.stop();
            }
            
            // Remove all event listeners
            if (vapiRef.current.removeAllListeners) {
              vapiRef.current.removeAllListeners();
            }
            
            // Clear the reference
            vapiRef.current = null;
            setIsInitialized(false);
          }
        } catch (err) {
          console.error('Cleanup error:', err);
        }
      };
      
      cleanup();
    };
  }, []); // Empty dependency array - only run once

  useEffect(() => {
    console.log('Interview Info Context:', interviewInfo);
    console.log('Call Status:', callStatus);
    console.log('Is Initialized:', isInitialized);
    
    // FIXED: Only start call when everything is ready
    if (interviewInfo && vapiRef.current && isInitialized && callStatus === 'idle') {
      startCall();
    }
  }, [interviewInfo, callStatus, isInitialized]);

  const startCall = async () => {
    if (!interviewInfo?.interviewData?.questionList) {
      const errMsg = 'Missing question list';
      console.error(errMsg);
      setError(errMsg);
      return;
    }

    // FIXED: Additional safety check
    if (!vapiRef.current || !isInitialized) {
      const errMsg = 'Voice assistant not initialized';
      console.error(errMsg);
      setError(errMsg);
      return;
    }

    try {
      const questionList = interviewInfo.interviewData.questionList
        .map(item => item?.question)
        .filter(Boolean)
        .join("\n");

      if (!questionList) {
        throw new Error('No valid questions found');
      }

      const assistantOptions = {
        name: "AI Recruiter",
        firstMessage: `Hi ${interviewInfo?.userName || 'there'}, welcome to your ${interviewInfo?.interviewData?.jobPosition || 'interview'}. Let's begin!`,
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are the questions, ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5–7 questions, wrap up the interview summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty ✅
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
            },
          ],
        },
        voice: {
          provider: "playht",
          voiceId: "jennifer",
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
      };

      console.log('Starting call with options:', assistantOptions);
      setCallStatus('starting');
      await vapiRef.current.start(assistantOptions);
    } catch (error) {
      console.error('Error starting call:', error);
      setError(error.message || 'Failed to start interview');
      setCallStatus('error');
    }
  };

  const stopInterview = async () => {
    try {
      if (vapiRef.current?.stop) {
        await vapiRef.current.stop();
        setCallStatus('ended');
      }
    } catch (error) {
      console.error('Error stopping call:', error);
      setError('Error ending call: ' + error.message);
    }
  };

  // FIXED: Use consistent variable name
  const userName = interviewInfo?.userName || interviewInfo?.user?.name || 'User';
  const userInitial = userName[0] || 'U';

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
          <button 
            onClick={() => setError(null)} 
            className="mt-2 text-sm underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ADDED: Initialization status */}
      {!isInitialized && !error && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          <p>Initializing voice assistant...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image src={"/v1.webp"} alt="v1"
            width={100}
            height={100}
            className="w-[60px] h-[60px] rounded-full object-cover" />
          <h2>AI Recruiter</h2>
          <p className="text-sm text-gray-500">
            Status: {callStatus}
          </p>
          {/* ADDED: Initialization indicator */}
          <p className="text-xs text-gray-400">
            {isInitialized ? '✅ Ready' : '⏳ Initializing...'}
          </p>
        </div>

        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>
            {userInitial}
          </h2>
          <h2>{userName}</h2>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
        </AlertConfirmation>
      </div>

      <h2 className="text-sm text-gray-400 text-center mt-5">
        {callStatus === 'active' ? 'Interview in Progress...' :
          callStatus === 'starting' ? 'Starting interview...' :
            callStatus === 'error' ? 'Error occurred' :
              callStatus === 'ended' ? 'Interview completed' :
                !isInitialized ? 'Initializing...' :
                  'Preparing interview...'}
      </h2>
    </div>
  );
}

export default StartInterview;

