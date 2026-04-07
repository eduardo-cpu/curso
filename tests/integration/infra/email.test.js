import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Eduardo <eduardosantossm@gmail.com>",
      to: "espaula@inf.ufsm.br",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "Eduardo <eduardosantossm@gmail.com>",
      to: "espaula@inf.ufsm.br",
      subject: "Último email enviado",
      text: "Corpo do último email.",
    });
    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<eduardosantossm@gmail.com>");
    expect(lastEmail.recipients[0]).toBe("<espaula@inf.ufsm.br>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Corpo do último email.\r\n");
  });
});
