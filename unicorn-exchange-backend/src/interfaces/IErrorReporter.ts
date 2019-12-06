import {ICommonRes} from "../../../unicorn-exchange-types/types/api/responses";

export interface ISystemError {
  error: string;
}

export interface IErrorReporter {
  report(err: ISystemError): Promise<ICommonRes>;
}

interface IExpressError {
  name: string;
  message: string;
  status: number;
}

export class ExpressError extends Error {
  status: number;

  constructor({name, message, status}: IExpressError) {
    super(message);
    super.name = name;
    this.status = status;
  }
}
