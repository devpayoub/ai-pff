import { WalletCards,Calendar,List,LayoutDashboard,Settings,Code2Icon,User2Icon,BriefcaseBusinessIcon,Puzzle,Component } from "lucide-react";

export const InterviewType=[
    {
        title:"Technical",
        icon:Code2Icon
    },
    {
        title:"Behavioral",
        icon:User2Icon
    },
    {
        title:"Experience",
        icon:BriefcaseBusinessIcon
    },
    {
        title:"Problem Solving",
        icon:Puzzle
    },
    {
        title:"Leadership",
        icon:Component
    }

]
export const SideBarOption=[
    {
        name:"Dashboard",
        icon:LayoutDashboard,
        path:"/dashboard"
    },
    {
        name:"Scheduled Interview",
        icon:Calendar,
        path:"/scheduled-interview"
    },
    {
        name:"All Interview",
        icon:List,
        path:"/all-interviews"
    },
    {
        name:"Billing",
        icon:WalletCards,
        path:"/billing"
    },
    {
        name:"Settings",
        icon:Settings,
        path:"/settings"
    },
 
] 

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.

Your task is to generate a well-structured list of **exactly 6** high-quality interview questions based on the following input:

🔹 Job Title: {{jobPosition}}
🔹 Job Description: {{jobDescription}}
🔹 Interview Duration: {{interviewDuration}} (generate only 6 questions regardless)
🔹 Allowed Question Types: {{type}}

🧠 Requirements:
- Only use the following types for the questions: {{type}}.
- Analyze the job description for relevant technologies, responsibilities, and experience.
- Make sure each question is appropriate to one of the specified types.
- Avoid using types that are not listed in {{type}}.
- Include a mix of easy and deep questions suited for a {{jobTitle}} role.
- Tailor content to match the provided interview duration, but always return 6 questions.

📦 Response Format:
Return ONLY a valid JSON with this format:

{
  "interviewQuestions": [
    {
      "question": "Your first question?",
      "type": "Technical" // must be one of: {{type}}
    },
    {
      "question": "Second question?",
      "type": "Behavioral"
    }
  ]
}

❌ Do NOT include any explanation or text outside the JSON.
✅ Make sure the types exactly match the allowed list: {{type}}.
`;
