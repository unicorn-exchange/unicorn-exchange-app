import {OrderModel} from "../../../../../../unicorn-exchange-types/types/models/order.model";
import {ICommonRes} from "../../../../../../unicorn-exchange-types/types/api/responses";
import {IDBInstance} from "../../../../../../unicorn-exchange-types/types/api/dtos";
import {validateObject} from "../../../../utils/utils";
import {dbInstanceValidationScheme} from "../../../../../../unicorn-exchange-types/types/validators/db-instance-validator";
import {UserModel} from "../../../../../../unicorn-exchange-types/types/models/user.model";
import {QueryInterfaceOptions} from "sequelize";

export function ordersDeclineCtr(
  currentUser: UserModel,
  params: IDBInstance,
  options?: QueryInterfaceOptions,
): Promise<ICommonRes> {
  return validateObject(params, dbInstanceValidationScheme)
    .then(() => OrderModel.findByPk(params.id))
    .then(order => {
      if (!order) {
        throw new Error("Order is not found");
      }
      return {
        ok: true,
        data: order.toJSON(),
      };
    })
    .catch(err => {
      return {
        ok: false,
        errors: [err],
      };
    });
}
