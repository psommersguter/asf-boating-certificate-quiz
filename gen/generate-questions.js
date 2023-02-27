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
  // console.log("parseQuestion", questionParts);


  function determineCorrect(rawAnswer) {
    const indicatorChar = rawAnswer.charAt(0);
    return indicatorChar === 'x'
  }

  const question = questionParts.slice(1, questionParts.length - 5).join(" ")

  const rawAnswer1 = questionParts[questionParts.length - 5];
  const rawAnswer2 = questionParts[questionParts.length - 4];
  const rawAnswer3 = questionParts[questionParts.length - 3];
  const rawAnswer4 = questionParts[questionParts.length - 2];

  return {
    "question": question,
    "answer1": { "text": rawAnswer1.substring(4), "correct": determineCorrect(rawAnswer1) },
    "answer2": { "text": rawAnswer2.substring(4), "correct": determineCorrect(rawAnswer2) },
    "answer3": { "text": rawAnswer3.substring(4), "correct": determineCorrect(rawAnswer3) },
    "answer4": { "text": rawAnswer4.substring(4), "correct": determineCorrect(rawAnswer4) },
    // "pictureBase64": "",
    "metadata": {
      "category": questionParts[0].charAt(0),
      "number": questionParts[questionParts.length-1],
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

  if (currentLine.match("^[ABCDEFMS]\\d{6}\\w?$")) {
    if (questionStartIndex !== null) {
      throw new Error("Start index is already set. Check the flow logic!");
    }
    questionStartIndex = i;
    continue;
  }

  if (currentLine.match("^\\d(\\.)?\\d{0,3}$")) {
    if (questionStartIndex === null) {
      throw new Error("Found question end before question start. Check the regexes!");
    }

    parsedQuestions.push(parseQuestion(lines.slice(questionStartIndex, i + 1)));
    questionStartIndex = null;
  }


}

// console.log(parsedQuestions);
fs.writeFileSync(getPathBesideFile("questions.json"), JSON.stringify(parsedQuestions), 'utf8')

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
