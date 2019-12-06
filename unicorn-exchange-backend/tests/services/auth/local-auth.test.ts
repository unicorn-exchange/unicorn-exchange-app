import {beforeAllCommon, mockBaseCtx, mockUserValid1, mockUserValid2} from "../../test_utils";
import {createDB} from "../../../src/services/db";
import {LocalAuth} from "../../../src/services/auth/local-auth";
import {Transaction} from "sequelize";
import {usersMeCtr} from "../../../src/api/v1/routes/users/users-me";
import {decodeToken} from "../../../src/api/middlewares/isAuth";

const db = createDB(mockBaseCtx);
const auth = new LocalAuth(mockBaseCtx, db);
let t: Transaction;

describe("Local auth service test", () => {
  beforeAll(() => beforeAllCommon(db).then(_t => (t = _t)));

  it("should sign in a user and get a valid token", () => {
    return auth.signIn(mockUserValid1).then(res => {
      expect(res.user.password).not.toBe(mockUserValid1.password);
      const obj = decodeToken(res.token);
      return usersMeCtr(obj).then(meRes => {
        expect(meRes.payload).toBeDefined();
        expect(meRes.payload!.id).toBe(res.user.id);
        return meRes;
      });
    });
  });

  it("should NOT sign up a user with the same email and username", () => {
    return auth.signUp(mockUserValid1, {transaction: t}).catch(err => {
      expect(err).toBeDefined();
    });
  });

  it("should sign up a different user", () => {
    return auth.signUp(mockUserValid2, {transaction: t}).then(res => {
      expect(res.user.email).toBe(mockUserValid2.email);
    });
  });

  afterAll(() => t.rollback());
});
