import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUpSubmit = async (values, { setSubmitting }) => {
    try {
      // Laravel API Endpoint: POST /api/register (ya jo bhi aapka signup endpoint ho)
      const response = await api.post("/register", {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "customer", // Default role customer hoga
      });

      if (response.data.success || response.status === 201 || response.status === 200) {
        toast.success("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex bg-[aliceblue] h-screen items-center justify-center">
      <div className="border rounded-2xl p-10 shadow-2xl bg-[#fff] sm:mx-auto sm:w-full sm:max-w-md border-slate-200">
        
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2 border border-orange-200 shadow-2xs">
            ⚡
          </div>
          <h2 className="font-sans text-center text-3xl font-black mb-1 text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-xs text-slate-500 font-medium">Join Muneeb Electronics today</p>
        </div>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={signUpSchema}
          onSubmit={handleSignUpSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  />
                  {errors.name && touched.name && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="e.g. user@gmail.com"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase text-slate-700 mb-1"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="block w-full px-4 py-2.5 rounded-xl border border-slate-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 flex w-full justify-center items-center rounded-xl bg-orange-600 hover:bg-orange-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/30 transition cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                  <span>Sign Up</span>
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-slate-500 border-t border-slate-100 pt-4">
          Already have an account?
          <Link
            to="/login"
            className="ml-1.5 font-bold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;