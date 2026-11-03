import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    try {
      // Laravel API Endpoint: POST /api/login
      const response = await api.post("/login", {
        email: values.email,
        password: values.password,
      });

      // Flexible response unwrapping for different Laravel auth patterns
      const resData = response.data;
      const token = resData.token || resData.access_token || resData.data?.token;
      const user = resData.user || resData.data?.user || resData.data;

      if (user) {
        toast.success(`Welcome back, ${user.name || user.fullName || "User"}! 🚀`);

        if (token) {
          localStorage.setItem("token", token);
        }
        localStorage.setItem("login-system", JSON.stringify(user));

        // Role ke mutabiq smart redirection
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/products"); // Updated to products storefront
        }
      } else {
        toast.error("Login successful, but user data not received.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Invalid email or password! Please try again.";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex bg-[aliceblue] h-screen items-center justify-center font-sans">
      <div className="border rounded-3xl p-10 shadow-2xl bg-[#fff] sm:mx-auto sm:w-full sm:max-w-md border-slate-200/80">
        
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2 border border-orange-200 shadow-2xs">
            ⚡
          </div>
          <h2 className="text-center text-3xl font-black mb-1 text-slate-900 tracking-tight">
            Muneeb Electronics
          </h2>
          <p className="text-xs text-slate-500 font-medium">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLoginSubmit}
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
                    placeholder="e.g. admin@gmail.com"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="block w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm bg-white"
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
                    className="block w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm bg-white"
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
                  <span>Sign In</span>
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-6 text-center text-xs text-slate-500 border-t border-slate-100 pt-4">
          Don't have an account?
          <Link
            to="/sign-up"
            className="ml-1.5 font-bold text-orange-600 hover:text-orange-700 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;