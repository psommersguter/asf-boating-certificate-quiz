#! /usr/bin/env node

import fs from "fs"
import path, {dirname} from "path"
import {fileURLToPath} from 'url';

function getPathBesideFile(relativePath) {
  const filePath = fileURLToPath(import.meta.url);
  const containingDirectoryPath = dirname(filePath);
  return path.join(containingDirectoryPath, relativePath)
}

function parseQuestion(questionParts) {
  function determineCategory(rawCategory) {
    switch (rawCategory) {
      case "A":
        return "Jachtbedienung";
      case "B":
        return "Bootsbau";
      case "C":
        return "Navigation";
      case "D":
        return "Rechtskunde";
      case "E":
        return "Wetter";
      case "F":
        return "Sicherheit";
      case "M":
        return "Modul Motor";
      case "S":
        return "Modul Segeln";
      default:
        throw new Error("Unable to determine category for given value " + rawCategory);
    }
  }

  function determineCorrect(joinedQuestionsAndAnswers, answerChar) {
    if (joinedQuestionsAndAnswers.includes(` x ${answerChar} `)) {
      return true;
    }

    if (joinedQuestionsAndAnswers.includes(` o ${answerChar} `)) {
      return false;
    }

    console.error(joinedQuestionsAndAnswers);
    throw new Error(`Could not determine correctness of answer '${answerChar}'`)
  }

  //join and split to correctly handle multiline questions and answers
  const joinedQuestionsAndAnswers = questionParts.slice(1, questionParts.length - 1).join(" ")
  const sanitizedQuestionAndAnswers = joinedQuestionsAndAnswers.split(new RegExp(" [xo] [abcd] "))
  if (sanitizedQuestionAndAnswers.length !== 5) {
    console.error(sanitizedQuestionAndAnswers);
    throw new Error("The length of the sanitizedQuestionAndAnswers array is not correct!");
  }

  return {
    "question": sanitizedQuestionAndAnswers[0],
    "answer1": {"text": sanitizedQuestionAndAnswers[1], "correct": determineCorrect(joinedQuestionsAndAnswers, "a")},
    "answer2": {"text": sanitizedQuestionAndAnswers[2], "correct": determineCorrect(joinedQuestionsAndAnswers, "b")},
    "answer3": {"text": sanitizedQuestionAndAnswers[3], "correct": determineCorrect(joinedQuestionsAndAnswers, "c")},
    "answer4": {"text": sanitizedQuestionAndAnswers[4], "correct": determineCorrect(joinedQuestionsAndAnswers, "d")},
    // "pictureBase64": "",
    "metadata": {
      "category": determineCategory(questionParts[0].charAt(0)),
      "number": questionParts[questionParts.length - 1],
      "code": questionParts[0]
    }
  };
}

const data = fs.readFileSync(getPathBesideFile("raw-data.txt"), 'utf8');

let parsedQuestions = [];

const lines = data.split(/\r?\n/);

let questionStartIndex = null;
for (let i = 0; i < lines.length; i++) {
  const currentLine = lines[i];

  if (currentLine.match(new RegExp("^[ABCDEFMS]\\d{6}\\w?$"))) {
    if (questionStartIndex !== null) {
      throw new Error("Start index is already set. Check the flow logic!");
    }
    questionStartIndex = i;
    continue;
  }

  if (currentLine.match(new RegExp("^\\d(\\.)?\\d{0,3}$"))) {
    if (questionStartIndex === null) {
      throw new Error("Found question end before question start. Check the regexes!");
    }

    parsedQuestions.push(parseQuestion(lines.slice(questionStartIndex, i + 1)));
    questionStartIndex = null;
  }


}

fs.writeFileSync(getPathBesideFile("questions.json"), JSON.stringify(parsedQuestions), 'utf8')
