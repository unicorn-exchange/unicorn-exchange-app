import {beforeAllCommon, mockBaseCtx} from "../test_utils";
import {createDB} from "../../src/services/db";
import {settingsCommonCtr} from "../../src/api/v1/routes/settings/settings-common";

const db = createDB(mockBaseCtx);

describe("Settings common route test", () => {
  beforeAll(() => beforeAllCommon(db));

  it("should return full settings list", async () => {
    const settings = await settingsCommonCtr();
    expect(settings.countries.length).toBeGreaterThan(0);
    expect(settings.cryptoCurrencies.length).toBeGreaterThan(0);
    expect(settings.paymentMethods.length).toBeGreaterThan(0);
  });
});
