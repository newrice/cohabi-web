import {
  BaseApiProp,
  BaseApiPropWithBody,
  ApiProp,
  ApiPropWithBody,
} from "./types";
import settings from "../settings";

export const BASE_BACKEND =
  settings.api[
    process.env.NODE_ENV as "production" | "staging" | "test" | "development"
  ];

const baseHeaders = {
  "Content-Type": "application/json; charset=utf-8",
};

/**
 * Base Apis
 *
 * @param param0
 */
const baseGet = async ({
  url,
  params,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
BaseApiProp): Promise<any> => {
  const urlObj = new URL(url);
  const p = new URLSearchParams();
  // パラメタがあった場合は追加
  if (params) {
    Object.keys(params).forEach(key => p.append(key, params[key]));
    urlObj.search = p.toString();
  }
  return fetch(urlObj.toString(), {
    method: "GET",
    // mode: "cors",
    cache: "no-cache",
    // credentials: 'include',
    headers,
    redirect: "follow",
  })
    .then(response => response.json())
    .catch(e => e);
};

const basePut = async ({
  url,
  params,
  body,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
BaseApiPropWithBody): Promise<any> => {
  const urlObj = new URL(url);
  const p = new URLSearchParams();
  // パラメタがあった場合は追加
  if (params) {
    Object.keys(params).forEach(key => p.append(key, params[key]));
    urlObj.search = p.toString();
  }
  return fetch(urlObj.toString(), {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: "follow",
    body: JSON.stringify(body), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  })
    .then(response => response.json()) // レスポンスの JSON を解析
    .catch(e => e);
};

const basePost = async ({
  url,
  params,
  body,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
BaseApiPropWithBody): Promise<any> => {
  const urlObj = new URL(url);
  const p = new URLSearchParams();
  // パラメタがあった場合は追加
  if (params) {
    Object.keys(params).forEach(key => p.append(key, params[key]));
    urlObj.search = p.toString();
  }
  return fetch(urlObj.toString(), {
    method: "Post",
    // mode: "cors",
    cache: "no-cache",
    // credentials: 'include', // include, same-origin, *omit
    headers,
    redirect: "follow",
    body: JSON.stringify(body), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  })
    .then(response => response.json()) // レスポンスの JSON を解析
    .catch(e => e);
};
const baseDelete = async ({
  url,
  params,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
BaseApiProp): Promise<any> => {
  const urlObj = new URL(url);
  const p = new URLSearchParams();
  // パラメタがあった場合は追加
  if (params) {
    Object.keys(params).forEach(key => p.append(key, params[key]));
    urlObj.search = p.toString();
  }
  return fetch(urlObj.toString(), {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    // credentials: 'include',
    headers,
    redirect: "follow",
  })
    .then(response => response.json())
    .catch(e => e);
};

export const postData = async ({
  url = BASE_BACKEND,
  params,
  body,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
ApiPropWithBody): Promise<any> => {
  const prop = {
    url,
    params,
    body,
    headers: { ...baseHeaders, ...headers },
  };
  //   if (withAuth) {
  //     return withAuthPost(prop);
  //   }
  return basePost(prop);
};

export const putData = async ({
  url = BASE_BACKEND,
  body,
  params,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
ApiPropWithBody): Promise<any> => {
  const prop = {
    url,
    params,
    body,
    headers: { ...baseHeaders, ...headers },
  };
  //   if (withAuth) {
  //     return withAuthPut(prop);
  //   }
  return basePut(prop);
};

export const getData = async ({
  url = BASE_BACKEND,
  params,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
ApiProp): Promise<any> => {
  const prop = {
    url,
    params,
    headers: { ...baseHeaders, ...headers },
  };
  //   if (withAuth) {
  //     return withAuthGet(prop);
  //   }
  return baseGet(prop);
};

export const deleteData = async ({
  url = BASE_BACKEND,
  params,
  headers,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
ApiProp): Promise<any> => {
  const prop = {
    url,
    params,
    headers: { ...baseHeaders, ...headers },
  };
  //   if (withAuth) {
  //     return withAuthDelete(prop);
  //   }
  return baseDelete(prop);
};
