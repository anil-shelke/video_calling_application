import { useMutation, useQueryClient } from '@tanstack/react-query';
import {logout} from '../lib/api.js'
import React from 'react'

const useLogout = () => {
  const queryClient = useQueryClient();
      const {mutate: logoutMutation} = useMutation({
          mutationFn: logout,
          onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})
      })

      return {logoutMutation}
}

export default useLogout
