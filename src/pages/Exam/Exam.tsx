import React, { useEffect, useState } from "react";
import QuestionTag from "./Question/Question";
import "./Exam.css";
import { FaRegCircle } from "react-icons/fa";
import { Question } from "../../types/Question";
import { getQuestion, getQuestions } from "../../services/questionService";
import { useNavigate } from "react-router";
import QuestionStatusList from "../../reducers/Reducer";
import { useStudentContext } from "../../contexts/StudentContext";
import { TrackStudentExam } from "../../types/TrackStudent";
import eachQuestion from "../../data/questionPaper.json";

const Exam: React.FC = () => {
  console.log(eachQuestion.baseResponse.data);
  const navigate = useNavigate();
  const { examDispatch, questionState } = useStudentContext();
  const [popup, setPopup] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submit, setSubmit] = useState<boolean>(false);
  const [slno, setSlno] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
    setPopup(width < 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [question, setQuestion] = useState<Question>({
    id: 0,
    question: "",
    solution: "",
  });

  console.log(questions);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await getQuestion(slno);
        setQuestion(data);
      } catch (error) {
        setError("Failed to fetch question papers");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestion();
  }, [slno]);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const data = await getQuestions();
        setQuestions(data);
      } catch (err) {
        setError("Failed to fetch question papers");
      } finally {
        setLoading(false);
      }
    };
    fetchAllQuestions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const calculateStatusCounts = () => {
    const statusCounts = {
      attempted: 0,
      skipped: 0,
      review: 0,
    };

    for (const key in questionState) {
      if (Object.prototype.hasOwnProperty.call(questionState, key)) {
        const questionDetails = questionState[Number(key)];
        switch (questionDetails.status) {
          case "attempted":
            statusCounts.attempted++;
            break;
          case "skipped":
            statusCounts.skipped++;
            break;
          case "review":
            statusCounts.review++;
            break;
          default:
            break;
        }
      }
    }

    return statusCounts;
  };

  const statusCounts = calculateStatusCounts();

  const handleSubmit = (confirm: boolean) => {
    if (confirm) {
      const examDetails: TrackStudentExam = {
        examId: 9763,
        topic: "Sample Exam",
        modeOfSubmit: "manual",
        taken: true,
        attempted: statusCounts.attempted,
        skipped: statusCounts.skipped,
        review: statusCounts.review,
        totalQuestions: questions.length,
        questionsResponses: questions.map((q) => ({
          questionId: q.id,
          optionSelected: questionState[q.id]?.optionSelected ?? null,
          status: questionState[q.id]?.status ?? "unattempted",
          timeTaken: questionState[q.id]?.timeTaken ?? null,
          timeOfSubmission: questionState[q.id]?.timeOfSubmission ?? null,
          timeOfStart: questionState[q.id]?.timeOfStart ?? null,
        })),
      };

      examDispatch({
        type: "SET_EXAM_DETAILS",
        examDetails,
      });

      console.log(examDetails);
      navigate("/home");
    }
    setSubmit(false);
  };

  return (
    <div>
      <div className="flex">
        <section className="exam">
          <div className="exam__header flex justify-between">
            <h4>Test for NEL Hackathon S1</h4>
            <span>
              <span style={{ background: "../../assets/clock.png" }}></span>
              09:20 Attenmpted: {statusCounts.attempted}/10
            </span>
          </div>
          <QuestionTag
            idx={slno + 1}
            time={new Date().toISOString()}
            question={question}
            handleSubmit={() => setSubmit(true)}
            handleClick={(id) => setSlno(id)}
            onDoubleTap={(id) => {
              if (id < questions.length) setSlno(id);
            }}
          />
        </section>
        <section className="exam__status">
          <h4>Question Paper Summary</h4>
          <div className="flex justify-evenly m-10">
            <div className="status__buttons flex flex-col align-center">
              <FaRegCircle color="rgba(1, 181, 138, 1)" />
              <span>Attempted</span>
            </div>
            <div className="status__buttons flex flex-col align-center">
              <FaRegCircle color="rgba(246, 188, 12, 1)" />
              <span>Revise Later</span>
            </div>
            <div className="status__buttons flex flex-col align-center">
              <FaRegCircle color="rgba(56, 93, 223, 1)" />
              <span>Skipped</span>
            </div>
          </div>
          <div className="question__status p-10">
            {questions.map((each, index) => (
              <button
                key={index}
                onClick={() => setSlno(index)}
                className={`${
                  questionState[each.id]?.status ?? "unattempted"
                } ${each.id === question.id ? "current" : ""}`}
              >
                Q. {index + 1}
              </button>
            ))}
          </div>
          <button
            className="submit_test"
            type="submit"
            onClick={() => setSubmit(true)}
          >
            Submit Test
          </button>
        </section>
      </div>
      <QuestionStatusList />
      <span className="p-5">Double click Answer to move to next question</span>
      {windowWidth && popup ? (
        <div className="wrapper" onClick={() => setPopup(!popup)}>
          <div className="popup">
            <h3>
              Do not press any external keys that can exit from the exam screen.
              <br /> Enable full screen mode.
            </h3>
          </div>
        </div>
      ) : null}

      {submit && (
        <div className="wrapper">
          <div className="popup">
            <div className="p-5 flex justify-evenly align-center">
              <span className="p-5">Attempted : {statusCounts.attempted}</span>
              <span className="p-5">
                Marked for Review : {statusCounts.review}
              </span>
              <span className="p-5">Skipped : {statusCounts.skipped}</span>
              <span className="p-5">
                Unattempted :{" "}
                {questions.length -
                  (statusCounts.attempted +
                    statusCounts.review +
                    statusCounts.skipped)}
              </span>
            </div>
            <h3>Are you sure you want to submit?</h3>
            <div className="flex align-center w-100">
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="no_btn"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="ok_btn"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
