import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
} from "infra/errors.js";

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response
    .status(publicErrorObject.statusCode)
    .json(publicErrorObject.errorToJSON());
}

function onErrorHandler(error, request, response) {
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json(error.errorToJSON());
  }

  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.error(publicErrorObject);

  response
    .status(publicErrorObject.statusCode)
    .json(publicErrorObject.errorToJSON());
}

const controller = {
  errorHandlers: {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  },
};

export default controller;
