export interface QuizItemData {
  metadata?: {
    category: string
    number: string
    code: string
  }
  question: string
  pictureBase64?: string
  answer1: AnswerData
  answer2: AnswerData
  answer3: AnswerData
  answer4: AnswerData

}


export interface AnswerData {
  correct: boolean,
  text: string
}

