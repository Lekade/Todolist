import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "470e32c0-943d-4aa1-985d-60cd15f8156e",
  },
})
