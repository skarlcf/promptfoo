import useApiConfig from '@app/state/apiConfig';
import { getAuthToken } from './utils/authToken';

export async function callApi(path: string, options: RequestInit = {}): Promise<Response> {
  const { apiBaseUrl } = useApiConfig.getState();
  const authToken = getAuthToken();

  if (authToken) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${authToken}`,
    };
  }

  return fetch(`${apiBaseUrl}/api${path}`, options);
}
