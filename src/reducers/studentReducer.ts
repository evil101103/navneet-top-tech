import { TrackStudent, StudentAction } from "../types/TrackStudent";

export const initialState: TrackStudent = {
  studentId: 10,
  name: "",
  institute: "",
  class: "",
  examDetails: [],
  topicsToFocus: [],
};

export const studentReducer = (
  state: TrackStudent,
  action: StudentAction
): TrackStudent => {
  switch (action.type) {
    case "SET_EXAM_DETAILS":
      const updatedExamDetails = [
        ...(state.examDetails || []),
        action.examDetails,
      ];
      return {
        ...state,
        examDetails: updatedExamDetails,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
};
