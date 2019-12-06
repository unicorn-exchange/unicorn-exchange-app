import {beforeAllCommon, mockBaseCtx, mockUserModel} from "../test_utils";
import {createDB} from "../../src/services/db";
import {ordersGetOneCtr} from "../../src/api/v1/routes/orders/orders-get-one.ctr";
import {orderCommonFields, orderReadFields} from "../../../unicorn-exchange-types/types/enums/forms/order";

const db = createDB(mockBaseCtx);

describe("Full order tests", () => {
  beforeAll(() => beforeAllCommon(db));

  it("should get one full order", async () => {
    const res = await ordersGetOneCtr(mockUserModel, {id: 1});
    expect(res.ok).toBeTruthy();
    expect(res.errors).not.toBeDefined();
    const order = res.payload!;
    expect(order).toBeDefined();
    expect(order!.id).toBe(1);
    expect(order[orderReadFields.owner]).toBeDefined();
    expect(order[orderReadFields.country]).toBeDefined();
    expect(order[orderCommonFields.currencyBuy]).toBeDefined();
    expect(order[orderCommonFields.currencySell]).toBeDefined();
    expect(order[orderReadFields.paymentMethod]).toBeDefined();
  });
});
