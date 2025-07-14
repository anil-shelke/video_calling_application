import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { signup } from '../lib/api';

const useSignUp = () => {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: (error) => {
    console.error("Signup failed:", error);
  }
  });

  return { error, isPending, signupMutation:mutate}
}

export default useSignUp
