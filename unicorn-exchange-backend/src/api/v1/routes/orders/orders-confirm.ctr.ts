import {ICommonRes} from "../../../../../../unicorn-exchange-types/types/api/responses";
import {validateObject} from "../../../../utils/utils";
import {IDBInstance} from "../../../../../../unicorn-exchange-types/types/api/dtos";
import {dbInstanceValidationScheme} from "../../../../../../unicorn-exchange-types/types/validators/db-instance-validator";
import {UserModel} from "../../../../../../unicorn-exchange-types/types/models/user.model";
import {QueryInterfaceOptions} from "sequelize";

export async function ordersConfirmCtr(
  currentUser: UserModel,
  params: IDBInstance,
  options?: QueryInterfaceOptions,
): Promise<ICommonRes> {
  return validateObject(params, dbInstanceValidationScheme).then(() => {
    return {
      ok: true,
    } as ICommonRes;
  });
}
