import {Sequelize} from "sequelize-typescript";
import path from "path";
import {IBaseContext} from "../interfaces/IContext";
import {UserModel} from "../../../unicorn-exchange-types/types/models/user.model";
import {ROOT} from "../../config";
import {CryptoCurrencyModel} from "../../../unicorn-exchange-types/types/models/crypto-currency.model";
import {CryptoAccountModel} from "../../../unicorn-exchange-types/types/models/crypto-account.model";
import {CryptoKeyModel} from "../../../unicorn-exchange-types/types/models/crypto-key.model";
import {OrderModel} from "../../../unicorn-exchange-types/types/models/order.model";
import {IEnv} from "../env";
import {CountryModel} from "../../../unicorn-exchange-types/types/models/country.model";
import {FiatModel} from "../../../unicorn-exchange-types/types/models/fiat.model";
import {PaymentMethodModel} from "../../../unicorn-exchange-types/types/models/payment-method.model";
import {countries} from "../../data/countries";
import {cryptoCurrencies} from "../../data/crypto-currencies";
import {paymentMethods} from "../../data/payment-methods";
import {BulkCreateOptions} from "sequelize";
import {initPolyfills} from "../utils/polyfils";
import {fiats} from "../../data/fiats";

initPolyfills(global);

export async function initDBConnection(ctx: IBaseContext): Promise<Sequelize> {
  const db = createDB(ctx);

  return db.authenticate().then(() => db);
}

export function createDB(ctx: IBaseContext): Sequelize {
  const {env} = ctx;
  const storage = path.join(ROOT, env.SQLITE_STORAGE_FILE);

  // @ts-ignore
  const sequelize = new Sequelize({
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    // eslint-disable-next-line no-console
    logging: console.log,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    storage,
  });
  sequelize.addModels([
    CryptoCurrencyModel,
    CountryModel,
    CryptoAccountModel,
    CryptoKeyModel,
    FiatModel,
    OrderModel,
    PaymentMethodModel,
    UserModel,
  ]);
  return sequelize;
}

export function initModels(db: Sequelize, env: IEnv): Promise<Sequelize> {
  return db.sync({force: env.IS_FORCE_DB_SYNC});
}

export function initDefaultData(db: Sequelize, env: IEnv): Promise<Sequelize> {
  const options: BulkCreateOptions = {
    fields: ["id", "title"],
    updateOnDuplicate: ["title"],
  };
  let truncateFn = Promise.all([Promise.resolve()]); // TODO: Find better alternatives
  if (env.DB_DIALECT === "sqlite") {
    delete options.updateOnDuplicate;
    truncateFn = Promise.all([
      CountryModel.truncate({force: true}),
      CryptoCurrencyModel.truncate({force: true}),
      FiatModel.truncate({force: true}),
      PaymentMethodModel.truncate({force: true}),
    ]);
  }
  return truncateFn.then(() => {
    return Promise.all([
      CountryModel.bulkCreate(countries, options),
      CryptoCurrencyModel.bulkCreate(cryptoCurrencies, options),
      FiatModel.bulkCreate(fiats, options),
      PaymentMethodModel.bulkCreate(paymentMethods, options),
    ]).then(() => db);
  });
}
