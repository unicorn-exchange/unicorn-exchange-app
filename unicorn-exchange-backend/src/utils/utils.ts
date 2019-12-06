import * as yup from "yup";

export function validateObject(data: object, schema: yup.ObjectSchemaDefinition<object>): Promise<object> {
  return yup
    .object()
    .shape(schema)
    .validate(data);
}

export function createHexFromObjectIds(arr: string[], sep = ":") {
  const sortedArr = arr.sort((a, b) => a.localeCompare(b));
  return {
    sortedArr,
    hex: sortedArr.join(sep),
  };
}
