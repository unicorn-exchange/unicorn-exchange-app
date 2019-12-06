import {beforeAllCommon, mockBaseCtx} from "../test_utils";
import {createDB} from "../../src/services/db";
import {UserModel} from "../../../unicorn-exchange-types/types/models/user.model";

const db = createDB(mockBaseCtx);

describe("Database test", () => {
  beforeAll(() => beforeAllCommon(db));

  it("should connect to database", () => {
    return db.authenticate().then(() => {
      expect(db).toBeDefined();
    });
  });

  it("should be able to manipulate with models", () => {
    return UserModel.findAll().then(users => {
      expect(Array.isArray(users)).toBe(true);
    });
  });
});
