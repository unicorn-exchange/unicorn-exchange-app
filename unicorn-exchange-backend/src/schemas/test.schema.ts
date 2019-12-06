import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import {Schemas} from "../../../unicorn-exchange-types/types/enums/schemas";

export const TestSchema = new Schema({
  property: String,
});

export const TestModel = mongoose.model(Schemas.Tests, TestSchema);
