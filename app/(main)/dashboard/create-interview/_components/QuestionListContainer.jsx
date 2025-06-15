import React from "react"


function QuestionListContainer({questionList}) {
    return (
        <div>
            <h2 className="font-bold text-lg mt-5">Generated Interview Questions :</h2>
            <div className="p-5 mt-5 bg-white border border-gray-500 rounded-xl">
                {questionList.map((item, index) => (
                    <div key={index} className="p-3 mt-3 border border-gray-400 rounded-2xl mb-3">
                        <h2 className="font-medium">{item.question}</h2>
                        <h2 className="text-sm text-primary white">Type: {item?.type}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default QuestionListContainer
