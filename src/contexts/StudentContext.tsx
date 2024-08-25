import React, { createContext, useReducer, ReactNode, useContext } from "react";
import {
  studentReducer,
  initialState as initialStudentState,
} from "../reducers/studentReducer";
import { examReducer, initialExamState } from "../reducers/examReducer";
import {
  questionReducer,
  initialState as initialQuestionState,
} from "../reducers/questionReducer";
import { TrackStudent } from "../types/TrackStudent";
import { ExamState } from "../types/Exam";
import { QuestionState } from "../reducers/questionReducer";

interface StudentContextProps {
  studentState: TrackStudent;
  studentDispatch: React.Dispatch<any>;
  examState: ExamState;
  examDispatch: React.Dispatch<any>;
  questionState: QuestionState;
  questionDispatch: React.Dispatch<any>;
}

const StudentContext = createContext<StudentContextProps | undefined>(
  undefined
);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [studentState, studentDispatch] = useReducer(
    studentReducer,
    initialStudentState
  );
  const [examState, examDispatch] = useReducer(examReducer, initialExamState);
  const [questionState, questionDispatch] = useReducer(
    questionReducer,
    initialQuestionState
  );

  return (
    <StudentContext.Provider
      value={{
        studentState,
        studentDispatch,
        examState,
        examDispatch,
        questionState,
        questionDispatch,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudentContext must be used within a StudentProvider");
  }
  return context;
};
