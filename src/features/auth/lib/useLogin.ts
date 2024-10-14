import { useFormik } from "formik"
import { login, selectIsLoggedIn } from "features/auth/model/auth-slice"
import { BaseResponseType } from "common/types"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { LoginParamsType } from "features/auth/api/authAPI.types"

type FormikErrorType = Omit<Partial<LoginParamsType>, "captcha">

export const useLogin = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }
      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 6) {
        errors.password = "length of at least 6 characters"
      }
      return errors
    },
    onSubmit: (values) => {
      dispatch(login(values))
        .unwrap()
        .catch((err: BaseResponseType) => {
          if (err.fieldsErrors) {
            err.fieldsErrors.forEach((el) => {
              formik.setFieldError(el.field, el.error)
            })
          }
        })
      formik.resetForm()
    },
  })
  return { formik, isLoggedIn }
}
