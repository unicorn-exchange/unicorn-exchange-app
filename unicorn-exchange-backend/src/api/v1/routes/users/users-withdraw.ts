import {ICommonRes, IOrdersCreateRes} from "../../../../../../unicorn-exchange-types/types/api/responses";
import {ordersCreateValidationScheme} from "../../../../../../unicorn-exchange-types/types/validators/orders-create-validator";
import {validateObject} from "../../../../utils/utils";
import {IOrderWriteDTO} from "../../../../../../unicorn-exchange-types/types/api/dtos";

export async function usersWithdrawCtr(params: IOrderWriteDTO): Promise<ICommonRes> {
  return validateObject(params, ordersCreateValidationScheme)
    .then(() => {
      return {
        ok: true,
      } as IOrdersCreateRes;
    })
    .catch(err => {
      return {
        ok: false,
        errors: [err],
      };
    });
}
