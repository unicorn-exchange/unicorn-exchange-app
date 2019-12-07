import {NextFunction, Request, Response} from "express";
import {Errors} from "../../../../unicorn-exchange-types/types/enums/errors";
import {ExpressError} from "../../interfaces/IErrorReporter";
import {ICommonRes} from "../../../../unicorn-exchange-types/types/api/responses";
import {ValidationError} from "yup";

// Catch 404 and forward to error handler
export function notFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
  next(
    new ExpressError({
      name: Errors.NotFound,
      message: "Page Not Found",
      status: 404,
    }),
  );
}

// Global error handler
export function globalErrorHandler(err: ExpressError, req: Request, res: Response, next: NextFunction) {
  // TODO: Think
  err.status = err.status || 500;
  const defaultRes: ICommonRes = {
    ok: false,
    errors: ["Unknown error"],
  };

  switch (err.name) {
    case Errors.NotFound:
      return res
        .status(err.status)
        .send(defaultRes)
        .end();
    case Errors.UnauthorizedError:
      return res
        .status(err.status)
        .send(defaultRes)
        .end();
    default:
      return res
        .status(err.status)
        .send(defaultRes)
        .end();
  }
}
