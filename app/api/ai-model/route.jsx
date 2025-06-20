import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){

    const {jobPosition, jobDescription, interviewDuration, type } = await req.json();
    const formattedTypes = type.join(', ');

    const FINAL_PROMPT = QUESTIONS_PROMPT
    .replaceAll("{{jobTitle}}", jobPosition)
    .replaceAll("{{jobDescription}}", jobDescription)
    .replaceAll("{{interviewDuration}}", interviewDuration)
    .replaceAll("{{type}}", formattedTypes);
  
    console.log(FINAL_PROMPT);

    try{
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY,
      })
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [
          { role: "user", content: FINAL_PROMPT }
        ],
      })
      console.log(completion.choices[0].message)
      return NextResponse.json(completion.choices[0].message)
    }
    catch(e){
        console.log(e)
        return NextResponse.json(e)
    }
}
