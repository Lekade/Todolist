import { instance } from "common/api"
import { BaseResponseType } from "common/types/BaseResponseType"
import { LoginParamsType } from "features/auth/api/authAPI.types"

export const authAPI = {
  login(params: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId: number }>>("/auth/login", params)
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>("/auth/me")
  },
  logout() {
    return instance.delete<BaseResponseType>("/auth/login")
  },
}
