export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esperado aconteceu", { cause });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.statusCode = statusCode || 500;
  }

  errorToJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Metodo não permitido para este endpoint.");
    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o metodo HTTP enviado é válido para este endpoint.";
    this.statusCode = 405;
  }

  errorToJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento.", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível e tente novamente.";
    this.statusCode = 503;
  }

  errorToJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Dados inválidos.", {
      cause,
    });
    this.name = "ValidationError";
    this.action = action || "Verifique se os dados fornecidos são válidos.";
    this.statusCode = 400;
  }

  errorToJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Usuário não encontrado.", {
      cause,
    });
    this.name = "NotFoundError";
    this.action = action || "Verifique se os dados fornecidos são válidos.";
    this.statusCode = 404;
  }

  errorToJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
export class UnauthorizedError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Acesso não autorizado.", {
      cause,
    });
    this.name = "UnauthorizedError";
    this.action = action || "Faça novamente o login para continuar.";
    this.statusCode = 401;
  }

  errorToJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
