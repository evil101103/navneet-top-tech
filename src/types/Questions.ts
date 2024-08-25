export interface QuestionOption {
    id: number;
    text: string;
    order: number;
    isFixed: boolean;
    isCorrect: boolean;
    actualText: string;
    isSelected: boolean;
}

export interface QuestionInfo {
    id: number;
    marks: number;
    gradeId: number;
    themeId: number;
    topicId: number;
    version: number;
    isPublic: boolean;
    question: string;
    solution: string;
    chapterId: number;
    createdBy: number;
    gradeName: string;
    subjectId: number;
    topicName: string;
    isNTTAdmin: boolean;
    chapterName: string;
    isPublished: boolean;
    noOfOptions: number;
    subjectName: string;
    createdByUser: string;
    isNTTQuestion: boolean;
    actualQuestion: string;
    completionTime: number;
    questionLevelId: number;
    questionOptions: QuestionOption[];
    questionTypeName: string;
    questionLevelName: string;
    questionErrorTypes: any[]; // Update with specific type if known
    questionTypeActive: boolean;
    questionObjectiveId: number;
    questionTypeMasterId: number;
    questionErrorTypeActive: boolean;
    questionTypeWithTemplate: string;
    questionTextWithoutImages: string;
    questionTypeIdWithTemplate: number;
}

export interface TemplatePart {
    id: number;
    name: string | null;
    ques: string | null;
    type: string;
    marks: string;
    subQue: string;
    manQues: string | null;
    children: any[]; // Update with specific type if known
    courseId: string;
    isHidden: number;
    parentID: number | null;
    question: string | null;
    showMarks: string | null;
    categoryId: string;
    chapterIds: number[];
    optionType: string;
    sequenceNo: string;
    instruction: string | null;
    marksFormat: string;
    orAlignment: string;
    elementTitle: string;
    orSequencing: string;
    questionInfo: QuestionInfo;
    sequenceText: string;
    templateType: number;
    difficultyIds: number[];
    partAlignment: string;
    questionOrder: {
        lang: string;
        langId: number;
        option: string;
        optionId: number;
    };
    orOptionConfig: {
        show: boolean;
        text: string;
        alignment: string | null;
        sequenceType: string;
    };
    questionTypeIds: number[];
    marksWithOptions: string | null;
    sectionAlignment: string;
    mainQuestionOrder: string;
    sequenceCustomized: boolean;
    marksAgainstQuestion: string;
    noOfOrOptionsInChildren: number;
    marksAgainstMainQuestion: string;
}

export interface QuestionPaperFontTemplate {
    bodyTemplate: {
        templateBuilderInfo: {
            rootType: string;
            currentLevel: number;
            templateParts: TemplatePart[];
        }
    }
}
