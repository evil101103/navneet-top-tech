import api from "./api";
import { QuestionPaper } from "../types/QuestionPaper";
import { Question } from "../types/Question";

export const getQuestionPaperById = async (
  id: number
): Promise<QuestionPaper> => {
  try {
    const response = await api.get(`/questionpaper/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching question paper:", error);
    throw new Error("Failed to fetch question paper");
  }
};

export const getQuestions = async (): Promise<Question[]> => {
  try {
    const response = await api.get("/questionpaper/9763");

    return response.data.data.questionPaperFontTemplate.bodyTemplate
      .templateBuilderInfo.templateParts;
  } catch (error) {
    console.error("Error fetching all question papers:", error);
    throw new Error("Failed to fetch question papers");
  }
};

export const getQuestion = async (id: number): Promise<Question> => {
  try {
    const response = await api.get("/questionpaper/9763");

    return response.data.data.questionPaperFontTemplate.bodyTemplate
      .templateBuilderInfo.templateParts[id].questionInfo;
  } catch (error) {
    console.error("Error fetching all question papers:", error);
    throw new Error("Failed to fetch question papers");
  }
};

export const getAllQuestionPapers = async (): Promise<QuestionPaper[]> => {
  try {
    const response = await api.get("/questionpaper");
    return response.data.baseResponse.data;
  } catch (error) {
    console.error("Error fetching all question papers:", error);
    throw new Error("Failed to fetch question papers");
  }
};
