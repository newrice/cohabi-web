/**
 * Query Parameter
 */
export interface QueryParams {
  [key: string]: string;
}
/**
 * Url Parameter
 */
export interface IUrlParams {
  [key: string]: string;
}
/**
 * API Response
 */
export interface IApiResponseBase<V> {
  result: {
    error: boolean;
    message: string;
  };
  body?: V;
}

// #region BaseApi Props
export interface BaseApiProp {
  url: string;
  params?: QueryParams; // FIXME: ここはすでにstringの方が良い？
  headers: Headers | Record<string, string>;
}
export interface BaseApiPropWithBody extends BaseApiProp {
  body?: unknown;
}
// #endregion

// #region Api Props
export interface ApiProp {
  url?: string;
  params?: QueryParams;
  withAuth?: boolean;
}
export interface ApiPropWithBody extends ApiProp {
  body?: unknown;
}
// #endregion
