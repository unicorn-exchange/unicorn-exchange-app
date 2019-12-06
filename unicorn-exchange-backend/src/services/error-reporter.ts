import {IErrorReporter, ISystemError} from "../interfaces/IErrorReporter";
import {IBaseContext} from "../interfaces/IContext";
import {ICommonRes} from "../../../unicorn-exchange-types/types/api/responses";

export class ErrorReporter implements IErrorReporter {
  private ctx: IBaseContext;

  constructor(ctx: IBaseContext) {
    this.ctx = ctx;
  }

  async report(err: ISystemError): Promise<ICommonRes> {
    this.ctx.logger.silly(err);
    return {ok: true};
  }
}
