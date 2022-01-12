export const enumToStringArray = <T extends string | number | boolean = string>(
  enumObject: Record<string | number, string | number | boolean>,
): T[] => {
  if (!enumObject) {
    throw new Error('Enum object is required');
  }
  return Object.values(enumObject).filter(
    (k) =>
      typeof k === 'string' || typeof k === 'number' || typeof k === 'boolean',
  ) as T[];
};

export const getOtherValuesFromEnum = <
  T extends string | number | boolean = string,
>(
  enumObject: Record<string | number, string | number>,
  items: T[],
): T[] => {
  return enumToStringArray<T>(enumObject).filter((st) => !items.includes(st));
};
