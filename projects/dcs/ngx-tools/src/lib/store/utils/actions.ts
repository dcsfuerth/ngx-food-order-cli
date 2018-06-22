export interface IAsyncActionNames {
  base: string;
  start: string;
  success: string;
  error: string;
  complete: string;
  reset: string;
}

export interface ICrudActionNames {
  fetch: IAsyncActionNames;
  create: IAsyncActionNames;
  update: IAsyncActionNames;
  delete: IAsyncActionNames;
}

/**
 * Generates action names via naming convention .
 *
 * With the given baseName 'PRODUCT' it returns the object
 * ```
 * {
 *   base:  'PRODUCT',
 *   start: 'PRODUCT_START',
 *   next:  'PRODUCT_NEXT',
 *   error: 'PRODUCT_ERROR'
 * }
 * ```
 *
 * @export
 * @param baseName
 */
export function generateAsyncActionNames(baseName: string): IAsyncActionNames {
  return {
    base: baseName,
    start: baseName + ' START',
    success: baseName + ' SUCCESS',
    error: baseName + ' ERROR',
    complete: baseName + ' COMPLETE',
    reset: baseName + ' RESET',
  };
}

export function generateCrudActionNames(baseName: string): ICrudActionNames {
  return {
    fetch: generateAsyncActionNames(`[${baseName}] Fetch`),
    create: generateAsyncActionNames(`[${baseName}] Create`),
    update: generateAsyncActionNames(`[${baseName}] Update`),
    delete: generateAsyncActionNames(`[${baseName}] Delete`),
  };
}
