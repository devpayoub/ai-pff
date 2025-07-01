'use client';
import React, { useState } from 'react';
import InterviewHeader from '../_components/InterviewHeader';
import { InterviewDataContext } from '@/context/InterviewDataContext';

export default function InterviewLayout({ children }) {
  const [InterviewInfo, setInterviewInfo] = useState();

  const contextValue = {
    interviewInfo: InterviewInfo,
    setInterviewInfo: setInterviewInfo
  };

  return (
    <InterviewDataContext.Provider value={contextValue}>
      <div className="bg-gray-200 min-h-screen">
        <InterviewHeader />
        {children}
      </div>
    </InterviewDataContext.Provider>
  );
}