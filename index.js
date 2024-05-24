#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

const welcome = async () => {
  const rainbowTitle = chalkAnimation.rainbow("JS Questionaire? \n");

  await sleep();

  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any of the questions wrong I will be ${chalk.bgRed("killed")}
    So get them right!
  `);
};

const askName = async () => {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
};

const handleAnswer = async (isCorrect) => {
  const spinner = createSpinner("Checking answer").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}` });
  } else {
    spinner.error({ text: `Game over, you lose ${playerName}` });
    process.exit(1);
  }
};

const question1 = async () => {
  const answers = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "What is the full meaning of JS \n",
    choices: ["Jump start", "Javascript", "Just saying"],
  });
  return handleAnswer(answers.question1 == "Javascript");
};

const question2 = async () => {
  const answers = await inquirer.prompt({
    name: "question2",
    type: "list",
    message: "When was Javascript invented \n",
    choices: ["1995", "1992", "2001"],
  });
  return handleAnswer(answers.question2 == "1995");
};

const question3 = async () => {
  const answers = await inquirer.prompt({
    name: "question3",
    type: "list",
    message: "Is Node.js single threaded or multithreaded \n",
    choices: ["Single threaded", "Multi threaded"],
  });
  return handleAnswer(answers.question3 == "Multi threaded");
};

const question4 = async () => {
  const answers = await inquirer.prompt({
    name: "question4",
    type: "list",
    message: "What is the best Javascript Library \n",
    choices: ["React.js", "Vue.js", "Svelte", "all of the above"],
  });
  return handleAnswer(answers.question4 == "all of the above");
};

const question5 = async () => {
  const answers = await inquirer.prompt({
    name: "question5",
    type: "list",
    message: "Do you love JS \n",
    choices: ["yes", "no"],
  });
  return handleAnswer(answers.question5 == "yes");
};

const winner = () => {
  console.clear();
  const msg = `Congrats, ${playerName} you win nothing!`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
};

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
