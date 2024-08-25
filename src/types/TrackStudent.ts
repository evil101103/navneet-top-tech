export interface TrackStudentQuestion {
  questionId?: number;
  optionSelected?: number | null;
  status?: string | "unattempted";
  timeTaken?: number | null;
  timeOfSubmission?: string | null;
  timeOfStart?: string | null;
}

export interface TrackStudentExam {
  examId: number | 9763;
  topic?: string;
  modeOfSubmit?: "auto" | "manual";
  attempted: number;
  skipped: number;
  review: number;
  taken: boolean | false;
  timeTaken?: number;
  timeOfSubmission?: string;
  timeOfStart?: string;
  questionsResponses?: Array<TrackStudentQuestion>;
  totalCorrectAnswers?: number;
  totalQuestions?: number;
  averageTimeTaken?: number; //minutes
  topicsToFocus?: Array<string>;
}

export interface TrackStudent {
  studentId: number | 10;
  name: string;
  institute: string;
  class: string;
  examDetails?: Array<TrackStudentExam>;
  topicsToFocus?: Array<string>;
}

export type StudentAction =
  | { type: "SET_EXAM_DETAILS"; examDetails: TrackStudentExam }
  | { type: "UPDATE_PROFILE"; name: string; email: string };
