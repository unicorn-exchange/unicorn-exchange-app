import {ICommonRes} from "./responses";

export const STATUS = "/status";

export interface APIDoc {
  [STATUS]: {
    GET: {
      response: ICommonRes;
    };
    HEAD: {
      response: ICommonRes;
    };
  };
}
