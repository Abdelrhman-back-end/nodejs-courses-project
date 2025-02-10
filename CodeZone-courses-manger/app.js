
 
import {Command} from "commander";
import inquirer from "inquirer";
import fs, { existsSync } from "fs";
import { json } from "stream/consumers";

const program = new Command();
const question = [
  { type: "input", name: "title", message: "please enter course title" },
  { type: "number", name: "price", message: "please enter price course" },
];

const filepath = "./course.json";

inquirer.prompt(question).then((answers) => {
  console.log(answers);
  if (existsSync(filepath)) {
    fs.readFile(filepath, "utf-8", (err, fileContect) => {
      if (err) {
        console.log("Error", err);
        process.exit();
      }
      console.log("file Contect ->", fileContect);
      const filecontectAsjson = JSON.parse(fileContect);
      filecontectAsjson.push(answers);
      fs.writeFile(filepath, JSON.stringify(filecontectAsjson), "utf8", () => {
        console.log("Add courses done");
      });
    });
  } else {
    fs.writeFile(filepath, JSON.stringify([answers]), "utf8", () => {
      console.log("Add courses done");
    });
  }
});
program
  .name("CodeZone-courses-manger")
  .description("CLI to make courses")
  .version("1.0.0");
program
  .command("add")
  .alias("a")
  .description("Add a course")
  .action(() => {});

program
  .command("list")
  .alias("l")
  .description("list all courses")
  .action(() => {
    fs.readFile(filepath, "utf8", (err, contect) => {
      if (err) {
        console.log("Error read file ", err);
        process.exit();
      }
      console.table(JSON.parse(contect));
    });
  });

program.parse(process.argv);
