import React, { useEffect, useState } from "react";
import right from "../../assets/check.png";
import wrong from "../../assets/wrong.png";
import { Question } from "../../types/Question";
import { getQuestion } from "../../services/questionService";
import HtmlRenderer from "../../containers/HtmlRender";
import { useStudentContext } from "../../contexts/StudentContext";

interface QuestionAnalysis {
  index: number;
  id: number;
}

const ReviewQuestion: React.FC<QuestionAnalysis> = ({ index, id }) => {
  const [question, setQuestion] = useState<Question>({
    id: 0,
    question: "",
    solution: "",
  });
  const { questionState } = useStudentContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(questionState[id]?.isCorrect);

  const computeMarks = () => {
    if (questionState[id]?.isCorrect) {
      return question?.marks;
    }
    return 0;
  };

  const marks = computeMarks();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestion(index);
        setQuestion(data);
      } catch (error) {
        setError("Failed to fetch question papers");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="_question_">
      <div className="flex justify-between align-center">
        <div>
          <h3>Q. {index + 1}</h3>
          <h3>
            <HtmlRenderer htmlContent={question?.question}></HtmlRenderer>
          </h3>
          <p className="flex align-center">
            <span>
              question 1
              <svg width="15" height="10" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="black" />
              </svg>
            </span>
            <span>
              5.marks
              <svg width="15" height="10" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="black" />
              </svg>
            </span>
            <span>
              Chapter: Solar System
              <svg width="15" height="10" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="black" />
              </svg>
            </span>
            <span>Easy</span>
          </p>

          <div className="_time_ flex flex-col">
            <span>Attempt Time</span>
            <span>Class | Student</span>
            <h3>5s | {questionState[id]?.timeTaken}s</h3>
          </div>
        </div>
        <div className="flex flex-col align-center justify-between">
          <h6>Student Question Performance</h6>
          <span className="marks__scored">
            {marks}/{question?.marks}
          </span>
          <div className="hr"></div>
          <span className="marks__scored">1/2</span>
          <h6>Class Question Performance</h6>
        </div>
      </div>
      <div className="flex justify-evenly">
        {question?.questionOptions?.map((option, idx) => (
          <div className="option__card w-100">
            <h3>Option {idx + 1}</h3>
            <h4>
              <HtmlRenderer htmlContent={option.actualText}></HtmlRenderer>
            </h4>
            {option.isCorrect ? (
              <div className="ans_correct">
                <img src={right} alt="right" />
                <span>Right Option</span>
              </div>
            ) : (
              <div className="ans_wrong">
                <img src={wrong} alt="wrong" />
                <span>Wrong Option</span>
              </div>
            )}
            {option.id === questionState[id]?.optionSelected ? (
              <div className="ans_correct">
                <img src={right} alt="right" />
                <span>Student Selected</span>
              </div>
            ) : (
              ""
            )}
            {option.isFixed ? (
              <div className="ans_correct">
                <img src={right} alt="right" />
                <span>Selected By Class</span>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewQuestion;
