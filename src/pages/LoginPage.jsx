import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { login } from '../lib/api'
import { ShipWheel,ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from '../hooks/useLogin';

const LoginPage = () => {

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })


  // This is how we did it first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: loginMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: login,
  //   onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"]})
  // })


  const {isPending, error, loginMutation} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData)
  }

  return (
  <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4">
    <div className="row w-100 mx-auto shadow-lg rounded overflow-hidden" style={{ maxWidth: "1140px" }}>
      {/* LOGIN FORM SECTION */}
      <div className="col-lg-6 p-4 d-flex flex-column">
        {/* LOGO */}
        <div className="mb-4 d-flex align-items-center gap-2">
          <ShipWheelIcon className="text-primary fs-3" />
          <span className="h3 fw-bold font-monospace text-primary">
            Streamify
          </span>
        </div>

        {/* ERROR MESSAGE DISPLAY */}
        {error && (
          <div className="alert alert-danger mb-4">
            <span>{error.response.data.message}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="w-100">
          <div className="mb-4">
            <h2 className="h5 fw-semibold">Welcome Back</h2>
            <p className="text-muted small">
              Sign in to your account to continue your language journey
            </p>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
              placeholder="hello@example.com"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isPending}>
            {isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="small">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary text-decoration-underline">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* IMAGE SECTION */}
      <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary bg-opacity-10">
        <div className="p-4 text-center">
          <div className="mb-4">
            <img src="/signup.png" alt="Language connection illustration" className="img-fluid" />
          </div>
          <h5 className="fw-semibold">Connect with language partners worldwide</h5>
          <p className="text-muted">
            Practice conversations, make friends, and improve your language skills together
          </p>
        </div>
      </div>
    </div>
  </div>
);

}

export default LoginPage
