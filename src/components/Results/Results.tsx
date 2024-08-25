import React, { useEffect, useState } from "react";
import "./Results.css";
import Print from "../../assets/print.png";
import img1 from "../../assets/numbers-fill 1.png";
import img2 from "../../assets/time-fill 1.png";
import img3 from "../../assets/focus-3-line 1.png";
import img4 from "../../assets/user-2-fill 1.png";
import { FaAngleDown } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { QuestionPaper } from "../../types/QuestionPaper";
import { getQuestions } from "../../services/questionService";
import { Question } from "../../types/Question";
import ReviewQuestion from "./ReviewQuestion";
import DoughnutChart from "./Doughnut";

interface Report {
  examDetails: QuestionPaper | null;
}

const Results: React.FC<Report> = ({ examDetails }) => {
  const data = [12, 8];

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

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

  const [viewVideos, setViewVideos] = useState<boolean>(false);
  const [viewReport, setViewReport] = useState<boolean>(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="results">
      <span className="results__header">
        <h4>{examDetails?.name}</h4>
        <button className="plain-btn">
          <img src={Print} alt="download"></img>
        </button>
      </span>
      <section>
        <div className="review__section">
          <span className="review__score">30 marks | Online</span>
          <button className="standard" type="button">
            VIII B,C,D Science
          </button>
          <div className="w-100 flex justify-evenly">
            <div className="card card1">
              <span>
                <img src={img1} alt="avg_class_score"></img>
              </span>
              <span className="flex flex-col">
                <span>Avg Class Score</span>
                <h3>24</h3>
              </span>
            </div>
            <div className="card card2">
              <span>
                <img src={img2} alt="avg_attempt_time"></img>
              </span>
              <span className="flex flex-col">
                <span>Avg Attempt Time</span>
                <h3>30m</h3>
              </span>
            </div>
            <div className="card card3">
              <span>
                <img src={img3} alt="High vs low"></img>
              </span>
              <span className="flex flex-col">
                <span>Highest VS Lowest</span>
                <h3>50 VS 20</h3>
              </span>
            </div>
            <div className="card card4">
              <span>
                <img src={img4} alt="attempted_vs_total"></img>
              </span>
              <span className="flex flex-col">
                <span>Students Attempted VS Total</span>
                <h3>25 VS 50</h3>
              </span>
            </div>
          </div>
        </div>
        <span className="p-15">
          Please revise the chapters to get perfect score.
        </span>
        <div className="score__analysis">
          <span className="flex justify-between align-center">
            <h3>Chapter-Wise Analysis</h3>
            <button className="download_btn_filled">Download Report</button>
          </span>
          <div className="__chart">
            <div className="doughnut-chart-container">
              <DoughnutChart data={data} />
            </div>
            <h6>Chapter:</h6>
            <h5>{examDetails?.description}</h5>
          </div>
          <div>
            <u>Topics Covered:</u>
            <ol>
              {examDetails?.questionPaperCourseDetails?.map((each) => (
                <li>{each.courseName}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section>
        <div className="view__details">
          <span className="flex justify-between align-center">
            <h4>Suggested videos based on performance</h4>
            <button
              className="plain-btn view__btn flex align-center p-10"
              onClick={() => setViewVideos(!viewVideos)}
            >
              <span className="p-5">View Details</span>
              <FaAngleDown color="rgba(1, 181, 138, 1)"></FaAngleDown>
            </button>
          </span>
          <div className={viewVideos ? "revise__videos" : "hide"}>
            {examDetails?.questionPaperCourseDetails?.map((each) => (
              <div className="video__card">
                <div className="_video_">{each.courseName}</div>
                <span className="_subject_">Mathematics</span>
                <h2>Angles & Equations</h2>
                <div className="_description_">
                  Theories in angles of triangles
                </div>
                <div className="flex">
                  <div className="_tag_">VII grade</div>
                  <div className="_tag_">Video</div>
                </div>
                <span className="flex align-center m-10">
                  <h3> Watch here</h3> <FaArrowRightLong />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="view__details">
          <span className="flex justify-between align-center">
            <h4>Question and Answer Overview</h4>
            <span className="flex align-center">
              <button className="download_btn_filled">Download Report</button>
              <button
                className="plain-btn view__btn flex align-center p-10"
                onClick={() => setViewReport(!viewReport)}
              >
                <span className="p-5">View Details</span>
                <FaAngleDown color="rgba(1, 181, 138, 1)"></FaAngleDown>
              </button>
            </span>
          </span>
          <div className={viewReport ? "revise__reports" : "hide"}>
            {questions.map((each, index) => (
              <ReviewQuestion key={index} index={index} id={each.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Results;
