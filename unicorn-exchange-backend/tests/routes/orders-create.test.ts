import {beforeAllCommon, mockBaseCtx, mockOrderCreateValid, mockUserModel} from "../test_utils";
import {createDB} from "../../src/services/db";
import {Transaction} from "sequelize";
import {ordersCreateCtr} from "../../src/api/v1/routes/orders/orders-create.ctr";

const db = createDB(mockBaseCtx);
let t: Transaction;

describe("Orders create tests", () => {
  beforeAll(() => beforeAllCommon(db).then(_t => (t = _t)));

  it("should create an order", async () => {
    const res = await ordersCreateCtr(mockUserModel, mockOrderCreateValid, {transaction: t});
    expect(res.ok).toBeTruthy();
    expect(res.payload).toBeDefined();
    return res;
  });

  afterAll(() => t.rollback());
});
