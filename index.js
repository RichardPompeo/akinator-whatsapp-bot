const venom = require("venom-bot");
const { Aki } = require("aki-api");

const region = "pt";
const aki = new Aki(region);

const isInGame = [];

venom
  .create("sessionName")
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    if (message.body) {
      if (
        message.body.toLowerCase().includes("cancelar") &&
        message.isGroupMsg === false &&
        isInGame.includes(message.from)
      ) {
        isInGame.pop();

        return client.sendText(
          message.from,
          `O jogo foi encerrado com sucesso. Para iniciar um jogo digite "Jogar"`
        );
      }

      if (isInGame.includes(message.from)) {
        if (aki.progress >= 70 || aki.currentStep >= 78) {
          await aki.win();
          console.log(message.from + ":", aki.answers[0]);
          isInGame.pop();
          return client.sendText(
            message.from,
            "Jogo finalizado! \n\n Eu acho que o seu personagem é... *" +
              aki.answers[0].name +
              `*\n\n Espero ter acertado! Para jogar de novo digite "Jogar"`
          );
        }

        switch (message.body.toLowerCase()) {
          case "sim":
            await aki.step(0);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "nao":
            await aki.step(1);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "não":
            await aki.step(1);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "nao sei":
            await aki.step(2);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "não sei":
            await aki.step(2);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "provavelmente sim":
            await aki.step(3);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "provavelmente nao":
            await aki.step(4);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          case "provavelmente não":
            await aki.step(4);
            return client.sendText(
              message.from,
              aki.question + "\n\n" + aki.answers.join("\n")
            );

          default:
            return;
        }
      }

      if (
        message.body.toLowerCase().includes("cancelar") &&
        message.isGroupMsg === false &&
        !isInGame.includes(message.from)
      ) {
        return client.sendText(
          message.from,
          `Não há nenhum jogo aberto. Para iniciar um jogo digite "Jogar"`
        );
      }

      if (
        message.body.toLowerCase().includes("akinator") &&
        message.isGroupMsg === false
      ) {
        return client.sendText(
          message.from,
          "*Como jogar:*\n\n" +
            "Pense em um personagem/alguém conhecido, então me responda perguntas sobre esse personagem e irei adivinhar quem é :)" +
            `\n\nPara iniciar o jogo digite "Jogar"`
        );
      }

      if (
        message.body.toLowerCase().includes("jogar") &&
        message.isGroupMsg === false
      ) {
        if (isInGame.includes(message.from)) {
          return client.sendText(
            message.from,
            `Você já tem um jogo aberto, caso deseje encerrar o jogo, envie "Cancelar"`
          );
        }

        await aki.start();
        isInGame.push(message.from);

        client.sendText(
          message.from,
          aki.question + "\n\n" + aki.answers.join("\n")
        );
      }
    } else {
      console.log("error");
    }
  });
}
