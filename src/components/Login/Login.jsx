import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  async function login(values) {
    try {
      setLoading(true);
      let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token);
      navigate("/home");
    } catch (err) {
      setApiError(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول.");
    }
    setLoading(false);
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("البريد الإلكتروني مطلوب").email("بريد إلكتروني غير صالح"),
    password: Yup.string()
      .required("كلمة المرور مطلوبة")
      .matches(/^[A-Z]\w{4,10}$/, "كلمة المرور غير صالحة، مثال: Ahmed123"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: login,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">تسجيل الدخول</h2>

        {apiError && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-100">
            {apiError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* حقل البريد الإلكتروني */}
          <div>
            <label className="block text-gray-700">البريد الإلكتروني</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="example@mail.com"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label className="block text-gray-700">كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
              <span className="absolute left-3 top-3 text-gray-400">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          {/* زر تسجيل الدخول */}
          <button
            type="submit"
            className={`w-full py-2 text-white rounded-lg flex justify-center items-center ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
            disabled={loading}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : "تسجيل الدخول"}
          </button>
        </form>

        {/* رابط التسجيل */}
        <p className="mt-4 text-center text-gray-600">
          ليس لديك حساب؟ <a href="/signup" className="text-blue-600 hover:underline">إنشاء حساب جديد</a>
        </p>
      </div>
    </div>
  );
}
