// # Enums

/**
 * To Specify sort order for $sort operation
 */
export enum SortOrder {
  /**
   * Sorts in Ascending Order
   */
  ASC = 1,

  /**
   * Sorts in Descending Order
   */
  DESC = -1,
}

/**
 * To Specify SHOW or HIDDEN in $project in aggregation pipeline
 */
export enum Visibility {
  /**
   * Shows this field
   */
  SHOW = 1,
  /**
   * Hides this field
   */
  HIDE = 0,
}
