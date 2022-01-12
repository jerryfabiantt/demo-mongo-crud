import { SortOrder } from './mongo-query-utils';
import { SortRequest } from '../view-models';

export const getSort = (sortReq: SortRequest, defaultField?: string) => {
  if (!sortReq || (!defaultField && !sortReq._sort)) {
    return undefined;
  }
  return {
    [sortReq._sort || defaultField]:
      sortReq._order === 'ASC' ? SortOrder.ASC : SortOrder.DESC,
  };
};
