import * as yup from "yup";
import {paginationFields} from "../enums/forms/pagination";
import {IOrdersReq} from "../api/requests";

export const paginationValidationScheme = {
  [paginationFields.limit]: yup
    .number()
    .min(1)
    .max(20)
    .nullable(),
  [paginationFields.offset]: yup
    .number()
    .min(0)
    .nullable(),
};

export const defaultPagination: IOrdersReq = {
  [paginationFields.limit]: 20,
  [paginationFields.offset]: 0,
};
