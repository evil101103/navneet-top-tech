export interface QuestionPaper {
  id: number;
  name: string;
  marks: number;
  description?: string;
  time?: number; //minutes
  allocationId?: number;
  templateID?: number;
  questionPaperTypeID?: number;
  gradeID?: number;
  statusID?: number;
  examTypeID?: number;
  statusName?: string;
  assignedBy?: string;
  generationModeID?: string;
  generationMode?: string;
  questionPaperCourseDetails?: Array<Course>;
  questionPaperClassDetails?: Array<ClassData>;
  questionPaperSectionDetails?: Array<Section>;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
}

export interface Course {
  courseID: number;
  courseName: string;
}

export interface ClassData {
  classId: number;
  className: string;
}

export interface Section {
  sectionID: number;
  sectionName: string;
}
