import {LocalAuth} from "../../src/services/auth/local-auth";
import {beforeAllCommon, mockBaseCtx, mockUserInvalid, mockUserValid2} from "../test_utils";
import {authSignUpCtr} from "../../src/api/v1/routes/auth/auth-sign-up";
import {createDB} from "../../src/services/db";
import {Transaction} from "sequelize";

const db = createDB(mockBaseCtx);
const auth = new LocalAuth(mockBaseCtx, db);
let t: Transaction;

describe("Sign up route tests", () => {
  beforeAll(() => beforeAllCommon(db).then(_t => (t = _t)));

  it("should fail to create a new user", async () => {
    const {ok, errors} = await authSignUpCtr(auth, mockUserInvalid, {transaction: t});
    expect(ok).toBeFalsy();
    expect(errors!.length).toEqual(1);
  });

  it("should create a new user", async () => {
    const {ok, errors} = await authSignUpCtr(auth, mockUserValid2, {transaction: t});
    expect(ok).toBeTruthy();
    expect(errors!.length).toEqual(0);
  });

  afterAll(() => t.rollback());
});
