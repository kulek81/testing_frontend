export interface VariantsModel {
    variants: number[]
}
export interface QuestionModel {
    topic: number;
    question: string;
    answers: [{
        answer: string;
        rightAnswer: boolean;
    }]
}