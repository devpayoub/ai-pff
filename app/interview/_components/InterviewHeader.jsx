import React from "react";
import Image from "next/image";

function InterviewHeader(){
    return (
        <div className="p-4 shadow-sm bg-white">
            <Image src={"/logo.webp"} alt="logo" width={200} height={100} 
            className="w-[140px]" />
        </div>
    );
}

export default InterviewHeader;