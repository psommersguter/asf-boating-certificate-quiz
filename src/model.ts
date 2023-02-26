export enum Category {
  A = "Jachtbedienung",
  B = "Bootsbau",
  C = "Navigation",
  D = "Rechtskunde",
  E = "Wetter",
  F = "Sicherheit",
  M = "Modul Motor",
  S = "Modul Segeln"

}

export interface QuizItemData {
  metadata?: {
    category: Category
    number: number
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

