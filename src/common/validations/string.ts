import { TransformFnParams } from 'class-transformer';

export const StringTransform = (params: TransformFnParams) => {
  return params.value?.toString();
};

export const UndefinedIfEmptyTransform = (params: TransformFnParams) => {
  return params.value === '' ? undefined : params.value;
};

export const SplitStringTransform = (
  params: TransformFnParams,
  splitChar = ','
) => {
  return typeof params.value !== 'string'
    ? undefined
    : params.value.split(splitChar);
};
