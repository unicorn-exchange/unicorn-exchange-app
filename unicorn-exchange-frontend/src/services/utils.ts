import {Schema} from "yup";
import {AbstractControl} from "@angular/forms";

export function yupValidate<T>(schema: Schema<T>) {
  return function validatorFn(control: AbstractControl) {
    try {
      schema.validateSync(control.value);
      return {};
    } catch (result) {
      if (result.errors.length) {
        return result.errors.reduce((obj, val) => {
          obj[result.type || result.message] = val;
          return obj;
        }, {});
      }
    }
  };
}

export function genCtrl({key, scheme, defaultValue = null}: {
  key: string;
  scheme: any;
  defaultValue?: any;
}) {
  const subScheme = scheme[key];
  if (!subScheme) {
    console.error("No sub-scheme", scheme, key);
    throw new Error("No sub-scheme");
  }
  return {
    [key]: [defaultValue, yupValidate(subScheme)],
  };
}
