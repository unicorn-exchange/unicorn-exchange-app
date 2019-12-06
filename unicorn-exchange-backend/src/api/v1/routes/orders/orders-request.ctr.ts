import {IDBInstance, IOrderWriteDTO} from "../../../../../../unicorn-exchange-types/types/api/dtos";
import {OrderModel} from "../../../../../../unicorn-exchange-types/types/models/order.model";
import {validateObject} from "../../../../utils/utils";
import {dbInstanceValidationScheme} from "../../../../../../unicorn-exchange-types/types/validators/db-instance-validator";
import {UserModel} from "../../../../../../unicorn-exchange-types/types/models/user.model";

export async function ordersRequestCtr(currentUser: UserModel, params: IDBInstance): Promise<IOrderWriteDTO> {
  return validateObject(params, dbInstanceValidationScheme)
    .then(() => OrderModel.findByPk(params.id))
    .then(order => {
      if (!order) {
        throw new Error("Order is not found");
      }
      return order.toJSON();
    })
    .catch(err => {
      return {
        ok: false,
        errors: [err],
      };
    });
}
