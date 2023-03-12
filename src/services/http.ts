import axios from 'axios';

export type HTTPHeaders = Record<string, any>;
export type HTTPRequestOptions = {
  url: string;
  body?: Record<string, string | number>;
  data?: string;
  headers?: HTTPHeaders;
  method?: 'PATCH' | 'POST' | 'GET' | 'DELETE';
  qs?: Record<string, string | number>;
};

class HttpService {
  static async request<T>(
    options: HTTPRequestOptions,
  ): Promise<{ body: T; responseHeaders: HTTPHeaders }> {
    const { body, headers, method, url } = options;
    const response = await axios.request<T>({
      method,
      url,
      data: body,
      headers: body
        ? {
            'Content-Type': 'application/json charset=UTF-8',
            ...options.headers,
          }
        : headers,
      params: options?.qs,
    });

    return { body: response.data, responseHeaders: response.headers };
  }
}

export default HttpService;
