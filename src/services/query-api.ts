import { QueryClient } from 'react-query';

const queryApi = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default queryApi;
