import { Option } from "./Option";
import { TrackStudentQuestion } from "./TrackStudent";

export interface Question {
  id: number;
  marks?: number;
  gradeId?: number;
  themeId?: number;
  topicId?: number;
  version?: number;
  isPublic?: boolean;
  question: string;
  solution: string;
  chapterId?: number;
  createdBy?: number;
  gradeName?: string;
  subjectId?: number;
  topicName?: string;
  isNTTAdmin?: boolean;
  chapterName?: string;
  isPublished?: boolean;
  noOfOptions?: number;
  subjectName?: string;
  createdByUser?: string;
  isNTTQuestion?: boolean;
  actualQuestion?: string;
  completionTime?: number; //minutes
  questionLevelId?: number;
  questionOptions?: Array<Option>;
  questionTypeName?: string;
  questionLevelName?: string;
  questionErrorTypes?: [
    {
      id?: number | string;
      active?: boolean;
      errorName?: string;
      description?: string;
      errorTypeId?: number;
    }
  ];
  questionTypeActive?: boolean;
  questionObjectiveId?: number;
  questionTypeMasterId?: number;
  questionErrorTypeActive?: boolean;
  questionTypeWithTemplate?: string;
  questionTextWithoutImages?: string;
  questionTypeIdWithTemplate?: number;

  trackStudentQuestion?: TrackStudentQuestion;
}

export interface CourseDetail {
  courseID: number;
  courseName: string;
}

export interface ClassDetail {
  classId: number;
  className: string;
}

export interface SectionDetail {
  sectionID: number;
  sectionName: string;
}

export interface Ques {
  id: number;
  name: string;
  marks: number;
  description: string;
  time: number;
  allocationId: number;
  templateID: number;
  questionPaperTypeID: number;
  gradeID: number;
  statusID: number;
  examTypeID: number;
  statusName: string;
  assignedBy: string;
  generationModeID: number;
  generationMode: string;
  questionPaperCourseDetails: CourseDetail[];
  questionPaperClassDetails: ClassDetail[];
  questionPaperSectionDetails: SectionDetail[];
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

export interface BaseResponse {
  data: Ques[];
  result: {
    responseCode: number;
    responseDescription: string;
  };
}

export interface PaginatedResponse {
  totalPages: number;
  pageSize: number;
  pageNo: number;
  baseResponse: BaseResponse;
}
