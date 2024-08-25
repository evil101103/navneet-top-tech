import { TrackStudentExam, TrackStudentQuestion } from "./TrackStudent";

export type ExamAction =
  | { type: "SET_EXAM_DETAILS"; examDetails: TrackStudentExam }
  | {
      type: "UPDATE_EXAM_STATUS";
      questionId: number;
      questionDetails: TrackStudentQuestion;
    }
  | { type: "RESET_EXAM" };

export interface ExamState {
  exam: TrackStudentExam | null;
}

export interface Exam {}
