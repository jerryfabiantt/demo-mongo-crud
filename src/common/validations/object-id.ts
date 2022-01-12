import { Types } from 'mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { TransformFnParams } from 'class-transformer';

@ValidatorConstraint({ name: 'IsStringObjectIdConstraint', async: false })
export class IsStringObjectIdConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments): boolean {
    return !!text && Types.ObjectId.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return '$value is not a valid ObjectId';
  }
}

export const IsStringObjectId = (validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsStringObjectId',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsStringObjectIdConstraint,
    });
  };
};

export const ObjectIdTransform = (params: TransformFnParams) => {
  if (!params || !params.value) {
    return undefined;
  }
  if (Types.ObjectId.isValid(params.value)) {
    return new Types.ObjectId(params.value);
  }
  return undefined;
};

export const NullObjectIdTransform = (params: TransformFnParams) => {
  if (!params || params.value === undefined) {
    return undefined;
  }
  if (params.value === null) {
    return null;
  }
  if (Types.ObjectId.isValid(params.value)) {
    return new Types.ObjectId(params.value);
  }
  return undefined;
};

export const ObjectIdListTransform = (params: TransformFnParams) => {
  if (!params || params.value === undefined) {
    return undefined;
  }
  if (Array.isArray(params.value)) {
    return params.value
      ?.map((value) => {
        if (Types.ObjectId.isValid(value)) {
          return new Types.ObjectId(value);
        }
        return undefined;
      })
      .filter((id) => id);
  }

  return undefined;
};

export const NullableObjectIdListTransform = (params: TransformFnParams) => {
  if (!params || params.value === undefined) {
    return undefined;
  }
  if (Array.isArray(params.value)) {
    return params.value
      ?.map((value) => {
        if (value === null) {
          return null;
        }
        if (Types.ObjectId.isValid(value)) {
          return new Types.ObjectId(value);
        }
        return undefined;
      })
      .filter((id) => id !== undefined);
  }

  return undefined;
};
