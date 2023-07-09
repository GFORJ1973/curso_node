const chalk = require("chalk");

const nota = 6;

if (nota >= 7) {
  console.log(chalk.green.bold("Parabéns, você passou!, sua nota foi " + nota));
} else {
  console.log(chalk.bgRedBright("Você precisa fazer a prova final!, sua nota foi " + nota));
}
