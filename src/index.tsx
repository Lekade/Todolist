import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store/Store"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/router"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
