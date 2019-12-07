import {config} from "dotenv";
import path from "path";
import {ENV_VARIABLES} from "../../unicorn-exchange-types/types/enums/environments";
import {BlockchainNodes} from "../../unicorn-exchange-types/types/enums/blockchain-nodes";
import {mockEnv} from "../tests/test_utils";

process.env.NODE_ENV = process.env.NODE_ENV || ENV_VARIABLES.DEVELOPMENT;

export interface IEnv {
  PORT: number;
  BLOCKCHAIN_NETWORK: string;
  IS_PRODUCTION: boolean;
  IS_FORCE_DB_SYNC: boolean;
  JWT_SECRET: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DIALECT: string;
  SQLITE_STORAGE_FILE: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_NAME: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
}

class Env implements IEnv {
  PORT: number;
  BLOCKCHAIN_NETWORK: string;
  IS_PRODUCTION: boolean;
  IS_FORCE_DB_SYNC: boolean = false;
  JWT_SECRET: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DIALECT: string;
  SQLITE_STORAGE_FILE: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_NAME: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;

  constructor(env: NodeJS.ProcessEnv) {
    if (!env.PORT) {
      throw new Error("Application port is not defined");
    }
    if (
      !env.BLOCKCHAIN_NETWORK ||
      (env.BLOCKCHAIN_NETWORK !== BlockchainNodes.Testnet && env.BLOCKCHAIN_NETWORK !== BlockchainNodes.Bitcoin)
    ) {
      throw new Error("Blockchain network is not defined");
    }
    if (!env.JWT_SECRET) {
      throw new Error("JWT secret is not defined");
    }
    if (!env.DB_HOST) {
      throw new Error("Database host is not defined");
    }
    if (!env.DB_NAME) {
      throw new Error("Database name is not defined");
    }
    if (!env.DB_USERNAME || !env.DB_PASSWORD) {
      throw new Error("Database username and password are not defined");
    }
    if (!env.SQLITE_STORAGE_FILE) {
      // eslint-disable-next-line no-console
      console.log("No SQLITE_STORAGE_FILE provided, using default - ", mockEnv.SQLITE_STORAGE_FILE);
    }
    if (!env.DB_DIALECT) {
      // eslint-disable-next-line no-console
      console.log("No SQLITE_STORAGE_FILE provided, using default - ", mockEnv.DB_DIALECT);
    }
    this.REDIS_HOST = env.REDIS_HOST || mockEnv.REDIS_HOST;
    this.REDIS_PORT = env.REDIS_PORT ? parseInt(env.REDIS_PORT, 10) : mockEnv.REDIS_PORT;
    this.REDIS_NAME = env.REDIS_NAME || mockEnv.REDIS_NAME;
    this.REDIS_USERNAME = env.REDIS_USERNAME || mockEnv.REDIS_USERNAME;
    this.REDIS_PASSWORD = env.REDIS_PASSWORD || mockEnv.REDIS_PASSWORD;
    this.PORT = parseInt(env.PORT, 10);
    this.BLOCKCHAIN_NETWORK = env.BLOCKCHAIN_NETWORK;
    this.IS_PRODUCTION = env.NODE_ENV === ENV_VARIABLES.PRODUCTION;
    this.JWT_SECRET = env.JWT_SECRET;
    this.DB_HOST = env.DB_HOST;
    this.DB_NAME = env.DB_NAME;
    this.DB_USERNAME = env.DB_USERNAME;
    this.DB_PASSWORD = env.DB_PASSWORD;
    this.DB_DIALECT = env.DB_DIALECT || mockEnv.DB_DIALECT;
    this.SQLITE_STORAGE_FILE = env.SQLITE_STORAGE_FILE || mockEnv.SQLITE_STORAGE_FILE;
  }
}

export function initEnvVariables(): IEnv {
  if (process.env.NODE_ENV === ENV_VARIABLES.DEVELOPMENT) {
    const envFound = config({path: path.join(__dirname, "../../../.env")});
    if (envFound.error) throw envFound.error;
  }
  return new Env(process.env);
}
