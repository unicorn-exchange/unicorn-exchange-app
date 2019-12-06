import {IAuth} from "../../../../interfaces/IAuth";
import {ISignInUserRes, ISignUpRes} from "../../../../../../unicorn-exchange-types/types/api/responses";
import {ISignUpUserReq} from "../../../../../../unicorn-exchange-types/types/api/requests";
import {signUpValidationScheme} from "../../../../../../unicorn-exchange-types/types/validators/sign-up-validator";
import {validateObject} from "../../../../utils/utils";
import {CryptoAccountModel} from "../../../../../../unicorn-exchange-types/types/models/crypto-account.model";
import {CryptoCurrencyIds} from "../../../../../data/crypto-currencies";
import {QueryInterfaceOptions} from "sequelize";

export async function authSignUpCtr(
  auth: IAuth,
  user: ISignUpUserReq,
  options?: QueryInterfaceOptions,
): Promise<ISignUpRes> {
  return validateObject(user, signUpValidationScheme)
    .then(() => auth.signUp(user, options))
    .then(({user, token}) => {
      if (!user) {
        throw new Error("No User");
      }
      return createDefaultWallets(user, options).then(() => {
        return {
          ok: true,
          errors: [],
          user,
          token,
        } as ISignUpRes;
      });
    })
    .catch(err => {
      return {
        ok: false,
        errors: [err],
      };
    });
}

function createDefaultWallets(user: ISignInUserRes, options?: QueryInterfaceOptions): Promise<any> {
  return Promise.all([
    CryptoAccountModel.create(
      {
        userId: user.id,
        cryptoCurrencyId: CryptoCurrencyIds.Bitcoin,
      },
      options,
    ),
    CryptoAccountModel.create(
      {
        userId: user.id,
        cryptoCurrencyId: CryptoCurrencyIds.Ethereum,
      },
      options,
    ),
  ]);
}
