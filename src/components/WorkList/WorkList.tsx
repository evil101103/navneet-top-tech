import React, { useState } from "react";
import "./WorkList.css";
import Img1 from "../../assets/geoshape.png";
import Bullet from "../../assets/star_button.png";
import { useNavigate } from "react-router";
import { QuestionPaper } from "../../types/QuestionPaper";
import { format, parse } from "date-fns";

const convertDateFormat = (inputDate: string): string => {
  try {
    const parsedDate = parse(inputDate, 'yyyy-MM-dd | h:mm a', new Date());
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date');
    }
    return format(parsedDate, "d MMM ''yy | HH:mm");
  } catch (error) {
    console.error(error);
    return 'Invalid date format';
  }
};


interface ExamDetails {
  examDetails: QuestionPaper;
}

const WorkList: React.FC<ExamDetails> = ({ examDetails }) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState<boolean>(false);

  const startAssessment = () => {
    if (window.innerWidth >= 1024) navigate("/exam");
    else setPopup(!popup);
  };
  return (
    <div className="worklist">
      <h4>Pending Work</h4>
      <div className="p-15">
        <div className="worklist__details flex justify-between align-center hr">
          <section className="flex align-center">
            <img className="p-10" src={Img1} alt="geo_shape"></img>
            <div className="worklist__title">
              <span>{examDetails.name}</span>
              <span className="__helper">Ch:{examDetails.description}</span>
              <span className="__helper">By:{examDetails.assignedBy}</span>
            </div>
          </section>
          <section className="worklist__timeline flex justify-evenly">
            <div className="worklist__time">
              <span>
                {convertDateFormat(
                  examDetails.startDate + " | " + examDetails.startTime
                )}
              </span>
              <span className="__helper">Assign</span>
            </div>
            <div className="worklist__time">
              <span>
                {convertDateFormat(
                  examDetails.endDate + " | " + examDetails.endTime
                )}
              </span>
              <span className="__helper">Due</span>
            </div>
            <div className="worklist__time">
              <span>{examDetails.marks}</span>
              <span className="__helper">Marks</span>
            </div>
            <div className="worklist__time">
              <span>{examDetails.time} Min(s)</span>
              <span className="__helper">Duration</span>
            </div>
          </section>
        </div>
        <div className="__instructions p-15">
          <span className="flex align-center">
            <img className="p-5" src={Bullet} alt="bullet_point"></img>
            <span>
              Swipe left or right to navigate between the questions or tap on
              the question no. to go directly
            </span>
          </span>
          <span className="flex align-center">
            <img className="p-5" src={Bullet} alt="bullet_point"></img>
            <span>Keep an eye on the timer at the top right</span>
          </span>
          <span className="flex align-center">
            <img className="p-5" src={Bullet} alt="bullet_point"></img>
            <span>Tap on options to select the correct answer</span>
          </span>
          <span className="flex align-center">
            <img className="p-5" src={Bullet} alt="bullet_point"></img>
            <span>Press "Finish Now" when done</span>
          </span>
        </div>
        <button
          className="start_test"
          type="button"
          onClick={() => startAssessment()}
        >
          Start Test
        </button>
      </div>
      {popup ? (
        <div className="wrapper" onClick={() => setPopup(!popup)}>
          <div className="popup">
            <h3>
              You cannot takeup exam from your mobile.<br></br> Use laptop.
            </h3>
            <button
              type="button"
              onClick={() => setPopup(!popup)}
              className="ok_btn"
            >
              Okay
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WorkList;
