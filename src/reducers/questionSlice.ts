import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackStudentQuestion } from '../types/TrackStudent';

interface QuestionsState {
  questions: TrackStudentQuestion[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    upsertQuestion(state, action: PayloadAction<TrackStudentQuestion>) {
      const updatedQuestion = action.payload;
      const index = state.questions.findIndex(q => q.questionId === updatedQuestion.questionId);
      if (index !== -1) {
        state.questions[index] = updatedQuestion;
      } else {
        state.questions.push(updatedQuestion);
      }
    },
    updateQuestionStatus(
      state,
      action: PayloadAction<{ questionId: number; status: string }>
    ) {
      const { questionId, status } = action.payload;
      const question = state.questions.find(q => q.questionId === questionId);
      if (question) {
        question.status = status;
      }
    },
  },
});

export const { upsertQuestion, updateQuestionStatus } = questionSlice.actions;
export default questionSlice.reducer;
