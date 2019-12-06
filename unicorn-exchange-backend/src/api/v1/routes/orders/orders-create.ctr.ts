import {OrderModel} from "../../../../../../unicorn-exchange-types/types/models/order.model";
import {IOrdersCreateRes} from "../../../../../../unicorn-exchange-types/types/api/responses";
import {ordersCreateValidationScheme} from "../../../../../../unicorn-exchange-types/types/validators/orders-create-validator";
import {validateObject} from "../../../../utils/utils";
import {IOrderWriteDTO} from "../../../../../../unicorn-exchange-types/types/api/dtos";
import {QueryInterfaceOptions} from "sequelize";
import {orderCommonFields, orderWriteFields} from "../../../../../../unicorn-exchange-types/types/enums/forms/order";
import {CurrencyTypes} from "../../../../../../unicorn-exchange-types/types/enums/currency-types";
import {UserModel} from "../../../../../../unicorn-exchange-types/types/models/user.model";

export async function ordersCreateCtr(
  currentUser: UserModel,
  params: IOrderWriteDTO,
  options?: QueryInterfaceOptions,
): Promise<IOrdersCreateRes> {
  return validateObject(params, ordersCreateValidationScheme)
    .then(() => toCurrencyType(params))
    .then(modelProps => {
      modelProps[orderWriteFields.ownerId] = currentUser.id;
      return OrderModel.create(modelProps, options);
    })
    .then(orderInstance => {
      return {
        ok: true,
        payload: orderInstance.toJSON(),
      } as IOrdersCreateRes;
    })
    .catch(err => {
      return {
        ok: false,
        errors: [err],
      };
    });
}

interface IOrderWriteModel extends IOrderWriteDTO {
  [orderWriteFields.countryId]: number;
  [orderWriteFields.ownerId]: number;
  [orderWriteFields.cryptoCurrencySellId]?: number;
  [orderWriteFields.fiatSellId]?: number;
  [orderWriteFields.cryptoCurrencyBuyId]?: number;
  [orderWriteFields.fiatBuyId]?: number;
  [orderWriteFields.paymentMethodId]: number;
}

// TODO: Refactor
export async function toCurrencyType(params: IOrderWriteDTO): Promise<IOrderWriteModel> {
  const o: any = {};
  switch (params[orderCommonFields.currencyBuy].type) {
    case CurrencyTypes.cryptoCurrency:
      o[orderWriteFields.cryptoCurrencyBuyId] = params[orderCommonFields.currencyBuy].id;
      break;
    case CurrencyTypes.fiat:
      o[orderWriteFields.fiatBuyId] = params[orderCommonFields.currencyBuy].id;
      break;
    default:
      throw new Error("Error");
  }
  switch (params[orderCommonFields.currencySell].type) {
    case CurrencyTypes.cryptoCurrency:
      o[orderWriteFields.cryptoCurrencySellId] = params[orderCommonFields.currencySell].id;
      break;
    case CurrencyTypes.fiat:
      o[orderWriteFields.fiatSellId] = params[orderCommonFields.currencySell].id;
      break;
    default:
      throw new Error("Error");
  }
  return Object.assign(params, o);
}
