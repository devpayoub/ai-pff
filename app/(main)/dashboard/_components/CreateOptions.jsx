import React from "react"
import { Video, Phone } from "lucide-react"
import Link from "next/link"

function CreateOptions() {
    return (
        <div className="grid grid-cols-2 gap-5">
            <Link href={"/dashboard/create-interview"} className="cursor-pointer bg-white border-gray-200 rounded-lg p-5">
                <Video className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12" />
                <h2 className="font-bold mt-5">Video Interview</h2>
                <p className="text-gray-500">Create AI Interview and shcaduale then with Candidates</p>
            </Link>
            <div className="bg-white border-gray-200 rounded-lg p-5">
                <Phone className="p-3 text-primary bg-blue-50 rounded-lg h-12 w-12" />
                <h2 className="font-bold mt-5">Phone Interview</h2>
                <p className="text-gray-500">Create AI Interview and shcaduale then with Candidates</p>
            </div>
        </div>
    )
}

export default CreateOptions
