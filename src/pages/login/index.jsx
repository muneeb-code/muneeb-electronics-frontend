import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-hot-toast";
import axios from "axios";
import * as bcrypt from "bcryptjs";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, setSubmitting) => {
    try {
      const { data } = await axios.get("http://localhost:4000/users");
      const isExist = data.find((user) => user.email === values.email);
      if (isExist) {
        const comparePassword = await bcrypt.compare(
          values.password,
          isExist.password
        );
        if (comparePassword) {
          toast.success("User logged in successfully!");

          // Log user data to verify full name is present
          console.log("User Data:", isExist);

          // Store full user data in local storage
          const userData = {
            name: isExist.name, // Store the user's full name
            email: isExist.email, // Store the user's email
          };
          localStorage.setItem("login-system", JSON.stringify(userData));

          navigate("/order");
        } else {
          toast.error("Incorrect password");
        }
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex bg-[aliceblue] h-full items-center justify-center">
      <div className="border rounded-xl p-10 shadow-2xl bg-[#fff] sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="font-sans text-center text-3xl font-semibold mb-3 text-gray-900">
          Login
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
          }}
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
            <form onSubmit={handleSubmit} className="space-y-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className="block w-full px-3 rounded py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter Your Password"
                    disabled={isSubmitting}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className="block w-full px-3 rounded py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-6 flex w-full justify-center rounded bg-orange-500 hover:bg-orange-600 px-3 py-0.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-4 text-center text-sm text-gray-500">
          Create your account
          <Link
            to="/sign-up"
            className="ml-2 font-semibold leading-6 text-orange-500 hover:text-orange-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
