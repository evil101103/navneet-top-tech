import React, { useEffect, useState } from "react";
import "./PendingWork.css";
import WorkList from "../WorkList/WorkList";
import Results from "../Results/Results";
import { QuestionPaper } from "../../types/QuestionPaper";
import { getAllQuestionPapers } from "../../services/questionService";
import { useStudentContext } from "../../contexts/StudentContext";

const PendingWork: React.FC = () => {
  const [worklist, setWorklist] = useState<QuestionPaper[]>([
    {
      id: 9763,
      name: "Hackathon",
      marks: 10,
    },  
  ]);
  const { examState } = useStudentContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await getAllQuestionPapers();
        setWorklist(data);
      } catch (err) {
        setError("Failed to fetch question papers");
      } finally {
        setLoading(false);
      }
    };
    fetchExamData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="pending_work">
      <span>Home / Pending Work / Online Assessments</span>
      {worklist.map((work, index) =>
        examState.exam?.taken ? (
          <Results key={index} examDetails={work}></Results>
        ) : (
          <WorkList key={index} examDetails={work}></WorkList>
        )
      )}
    </div>
  );
};

export default PendingWork;
