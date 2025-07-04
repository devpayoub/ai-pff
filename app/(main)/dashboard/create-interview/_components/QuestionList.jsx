import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from '@/services/subabaseClient';
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from 'uuid';

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const hasGenerated = useRef(false);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData && !hasGenerated.current) {
      hasGenerated.current = true;
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    setRegenerating(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      const Content = result.data.content;
      const FINAL_CONTENT = Content
        .replace(/```json\n?/g, "")
        .replace(/```/g, "");

      setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions || []);
    } catch (e) {
      toast("Server Error. Try Again!");
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const { interviewDuration, ...restFormData } = formData;
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("Interviews")
      .insert([
        {
          ...restFormData,
          duration: interviewDuration,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();

    setSaveLoading(false);
    console.log("Insert result:", data);
    console.log("Insert error:", error);

    onCreateLink(interview_id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 mt-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">
              Our AI is crafting personalized questions based on your job description
            </p>
          </div>
        </div>
      )}

      {!loading && regenerating && (
        <div className="mt-5 p-4 text-sm text-muted-foreground italic">
          <p>Generated new questions...</p>
        </div>
      )}

      {!regenerating && questionList?.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />
        </div>
      )}

      {questionList?.length > 0 && (
        <div className="flex justify-between mt-10">
          <Button
            variant="outline"
            onClick={GenerateQuestionList}
            disabled={loading}
          >
            {loading ? (
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            New Questions
          </Button>

          <Button
            onClick={onFinish}
            disabled={loading || saveLoading}
          >
            {saveLoading && (
              <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create Interview Link & Finish
          </Button>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
