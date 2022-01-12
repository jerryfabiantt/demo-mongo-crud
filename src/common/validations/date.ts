import { TransformFnParams } from 'class-transformer';
import moment from 'moment-timezone';

export const DateTransform = (params: TransformFnParams) => {
  if (!params || !params.value) {
    return undefined;
  }
  try {
    return new Date(params.value);
  } catch (e) {
    return undefined;
  }
};

export const DateListTransform = (params: TransformFnParams) => {
  if (!params || params.value === undefined) {
    return undefined;
  }
  if (Array.isArray(params.value)) {
    return params.value
      ?.map((value) => {
        try {
          return new Date(value);
        } catch (e) {
          return undefined;
        }
      })
      .filter((id) => id);
  }

  return undefined;
};

export const MidnightTransform = (params: TransformFnParams): Date => {
  if (!params || !params.value) {
    return undefined;
  }
  return new Date();
};

export const DateWithFormatTransform =
  (format: string) => (params: TransformFnParams) => {
    if (!params || !params.value) {
      return undefined;
    }
    try {
      const dateMoment = moment(params.value, format);
      if (dateMoment.isValid()) {
        return dateMoment.toDate();
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  };
