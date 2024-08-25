export interface QuestionDetails {
  optionSelected: number | null;
  status: string | "unattempted";
  timeTaken: number | null; // in seconds
  timeOfSubmission: string | null;
  timeOfStart: string | null;
  marks: number | 0;
  isCorrect: boolean;
}

export interface QuestionState {
  [questionId: number]: QuestionDetails;
}

export type QuestionAction =
  | {
      type: "SET_STATUS";
      questionId: number;
      status: string | "unattempted";
      marks: number;
    }
  | {
      type: "SET_OPTION";
      questionId: number;
      optionSelected: number | null;
      status: string | "attempted";
      isCorrect: boolean;
      timeTaken: number;
      marks: number;
    }
  | { type: "SET_TIME"; questionId: number; timeTaken: number | null }
  | {
      type: "SET_TIMES";
      questionId: number;
      timeOfStart: string;
      timeOfSubmission: string;
    }
  | { type: "RESET"; questionId: number };

export const initialState: QuestionState = {};

export const questionReducer = (
  state: QuestionState,
  action: QuestionAction
): QuestionState => {
  console.log(state);
  switch (action.type) {
    case "SET_STATUS":
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          status: action.status,
          marks: action.marks,
        },
      };
    case "SET_OPTION":
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          optionSelected: action.optionSelected,
          status: "attempted",
          marks: action.marks,
          timeTaken: action.timeTaken,
          isCorrect: action.isCorrect,
        },
      };
    case "SET_TIME":
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          timeTaken: action.timeTaken,
        },
      };
    case "SET_TIMES":
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          timeOfStart: action.timeOfStart,
          timeOfSubmission: action.timeOfSubmission,
        },
      };
    case "RESET":
      return {
        ...state,
        [action.questionId]: initialState[action.questionId] || {
          optionSelected: null,
          status: "unattempted",
          timeTaken: null,
          timeOfSubmission: null,
          timeOfStart: null,
        },
      };
    default:
      return state;
  }
};
