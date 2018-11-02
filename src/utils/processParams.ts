import { HomeEvent } from '../events';
export interface PaginationParams {
  page: number;
  quantity: number;
}

export function processParams(query: any, sortedOutput: HomeEvent[], errorMessage: string): PaginationParams  {
  let page: number = query.page? Number(query.page) : 1;
  let quantity: number = query.quantity? Number(query.quantity) : sortedOutput.length;

  if (page > Math.ceil(sortedOutput.length / quantity)) {
    throw new Error(errorMessage);
  }

  return {
    page,
    quantity
  };
}
