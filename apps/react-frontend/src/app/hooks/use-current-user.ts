import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/auth/auth.service';

/**
 * @description To query and cache user data, caches the value with key currentUser.
 *
 * @function useCurrentUser
 * @returns { ADD_TYPE }
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'], // cache key
    queryFn: getCurrentUser, // this is the method being called from the auth service to GET the user data
    retry: false, // Does not retry, if it fails, there is no user data.
    staleTime: 15 * 60 * 1000, // 15 minutes before assuming data is stale
  });
};
