import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { signup } from "../lib/api";
import useSignUp from "../hooks/useSignUp";

// import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // This is how we did it at first, without using our custom hook
  // const queryClient = useQueryClient();
  // const {
  //   mutate: signupMutation,
  //   isPending,
  //   error,
  // } = useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  //   onError: (error) => {
  //   console.error("Signup failed:", error);
  // }
  // });

  // This is how we did it using our custom hook - optimized version
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
    // console.log("signup button clicked")
  };

return (
  <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
    <div className="row shadow rounded-3 overflow-hidden w-100" style={{ maxWidth: "1100px" }}>
      
      {/* SIGNUP FORM - LEFT SIDE */}
      <div className="col-lg-6 p-4 p-sm-5">
        {/* LOGO */}
        <div className="mb-4 d-flex align-items-center gap-2">
          <ShipWheelIcon style={{ width: 36, height: 36 }} className="text-primary" />
          <span className="h3 fw-bold font-monospace text-primary">
            Streamify
          </span>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="alert alert-danger">
            <span>{error?.response?.data?.message || "Something went wrong!"}</span>
          </div>
        )}

        <form onSubmit={handleSignup}>
          <h2 className="h5 fw-semibold mb-1">Create an Account</h2>
          <p className=" mb-4">
            Join Streamify and start your language learning adventure!
          </p>

          {/* Full Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control "
              style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
              placeholder="Anil Shelke"
              value={signupData.fullName}
              onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
              placeholder="anil@gmail.com"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: '#1e1e1e', color: 'white', borderColor: '#444' }}
              placeholder="********"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />
            <small className="form-text text-muted">
              Password must be at least 6 characters long
            </small>
          </div>

          {/* Terms */}
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="termsCheck"
              required
            />
            <label className="form-check-label small" htmlFor="termsCheck">
              I agree to the <span className="text-primary text-decoration-underline">terms of service</span> and{" "}
              <span className="text-primary text-decoration-underline">privacy policy</span>
            </label>
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-100" type="submit">
            {isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary text-decoration-underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* ILLUSTRATION - RIGHT SIDE */}
      <div className="d-none d-lg-flex col-lg-6 align-items-center justify-content-center">
        <div className="text-center p-4">
          <img
            src="/signup.png"
            alt="Language connection illustration"
            className="img-fluid mb-4"
            style={{ maxWidth: "80%" }}
          />
          <h5>Connect with language partners worldwide</h5>
          <p className="text-muted">
            Practice conversations, make friends, and improve your language skills together
          </p>
        </div>
      </div>
    </div>
  </div>
);

};

export default SignUpPage;