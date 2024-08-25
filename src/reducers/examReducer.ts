import { ExamAction, ExamState } from "../types/Exam";

export const initialExamState: ExamState = {
  exam: null,
};

export const examReducer = (
  state: ExamState,
  action: ExamAction
): ExamState => {
  switch (action.type) {
    case "SET_EXAM_DETAILS":
      return {
        ...state,
        exam: action.examDetails,
      };
    case "UPDATE_EXAM_STATUS":
      if (state.exam) {
        const updatedQuestionsResponses =
          state.exam.questionsResponses?.map((question) =>
            question.questionId === action.questionId
              ? { ...question, ...action.questionDetails }
              : question
          ) || [];

        return {
          ...state,
          exam: {
            ...state.exam,
            questionsResponses: updatedQuestionsResponses,
          },
        };
      }
      return state;
    case "RESET_EXAM":
      return initialExamState;
    default:
      return state;
  }
};
