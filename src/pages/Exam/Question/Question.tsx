import React, { useEffect } from "react";
import { Question } from "../../../types/Question";
import HtmlRenderer from "../../../containers/HtmlRender";
import "./Question.css";
import { useStudentContext } from "../../../contexts/StudentContext";

interface ActualQuestion {
  idx: number;
  time: string;
  question: Question;
  handleClick: (id: number) => void;
  handleSubmit: () => void;
  onDoubleTap: (updatedQuestion: number) => void;
}

const QuestionTag: React.FC<ActualQuestion> = ({
  idx,
  time,
  question,
  handleClick,
  handleSubmit,
  onDoubleTap,
}) => {
  const { questionState, questionDispatch } = useStudentContext();
  const [startTime, setStartTime] = React.useState<string | null>(null);

  useEffect(() => {
    const now = new Date().toISOString();
    setStartTime(now);
    questionDispatch({
      type: "SET_TIMES",
      questionId: question.id,
      timeOfStart: now,
      timeOfSubmission: "",
    });
  }, [question.id, questionDispatch]);

  const handleOptionClick = (value: number, correct: boolean) => {
    questionDispatch({
      type: "SET_OPTION",
      questionId: question.id,
      optionSelected: value,
      status: "attempted",
      timeTaken: Math.floor(
        (new Date().getTime() - new Date(time).getTime()) / 1000
      ),
      isCorrect: correct,
      marks: correct ? question.marks : 0,
    });
  };

  const handleDoubleClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    correct: boolean
  ) => {
    event.preventDefault();
    const now = new Date().toISOString();
    const timeTaken = startTime
      ? Math.floor(
          (new Date().getTime() - new Date(startTime).getTime()) / 1000
        )
      : null;
    questionDispatch({
      type: "SET_STATUS",
      questionId: question.id,
      status: "attempted",
      marks: correct ? question.marks : 0,
    });
    questionDispatch({ type: "SET_TIME", questionId: question.id, timeTaken });
    questionDispatch({
      type: "SET_TIMES",
      questionId: question.id,
      timeOfStart: startTime!,
      timeOfSubmission: now,
    });
    onDoubleTap(idx);
  };

  const handleMarkReview = () => {
    questionDispatch({
      type: "SET_STATUS",
      questionId: question.id,
      status:
        questionState[question.id]?.status === "review"
          ? "attempted"
          : "review",
    });
  };

  const handleSkip = () => {
    questionDispatch({
      type: "SET_STATUS",
      questionId: question.id,
      status: "skipped",
    });
    handleClick(idx);
  };

  return (
    <div>
      <h4 className="flex align-center p-15">
        <span>Q. {idx}. </span>
        <HtmlRenderer htmlContent={question.question} />
      </h4>
      <ol className="flex justify-evenly wrap alpha__option">
        {question.questionOptions?.map((option) => (
          <div
            key={option.id}
            className={`option__ans ${
              questionState[question.id]?.optionSelected === option.id
                ? "selected"
                : ""
            }`}
            onDoubleClick={(e) => handleDoubleClick(e, option.isCorrect)}
            onClick={() => handleOptionClick(option.id, option.isCorrect)}
          >
            <li>
              <HtmlRenderer htmlContent={option.actualText} />
            </li>
          </div>
        ))}
      </ol>
      <section className="button__section">
        <button
          className="previous__button"
          type="button"
          disabled={idx === 1}
          onClick={() => handleClick(idx - 2)}
        >
          Previous
        </button>
        <button
          className={
            questionState[question.id]?.status === "review"
              ? "review__marked"
              : "review__button"
          }
          type="button"
          onClick={handleMarkReview}
          onDoubleClick={() => {
            handleMarkReview();
            handleClick(idx);
          }}
        >
          {questionState[question.id]?.status === "review" ? (
            <span>Marked</span>
          ) : (
            <span>Mark for Review</span>
          )}
        </button>
        <button
          className="skip__button"
          type="button"
          onDoubleClick={handleSkip}
        >
          Skip
        </button>
        <button className="close__button" type="button" onClick={handleSubmit}>
          Close Test
        </button>
      </section>
    </div>
  );
};

export default QuestionTag;
