import database from "infra/database.js";
import email from "infra/email.js";
import webserver from "infra/webserver";

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000; // 15 minutos

async function findOneByUserId(userId) {
  const result = await database.query({
    text: `
      SELECT 
        *
      FROM 
        user_activation_tokens
      WHERE 
        user_id = $1
      LIMIT
        1
    ;`,
    values: [userId],
  });
  return result.rows[0];
}

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const result = await database.query({
      text: `
      INSERT INTO 
        user_activation_tokens (user_id, expires_at)
      VALUES
        ($1, $2)
      RETURNING 
      *
    ; `,
      values: [userId, expiresAt],
    });
    return result.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "Eduardo <contato@example.com>",
    to: user.email,
    subject: "Ative sua conta",
    text: `Olá ${user.username}, ative sua conta clicando no link abaixo: 

${webserver.origin}/cadastro/ativar/${activationToken.id}

Atenciosamente
Equipe Eduardo`,
  });
}

const activation = {
  sendEmailToUser,
  create,
  findOneByUserId,
};

export default activation;
