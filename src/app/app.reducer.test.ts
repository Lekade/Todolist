import { app, AppInitialStateType, setAppError, setAppStatus } from "app/app-slice"

let startState: AppInitialStateType

beforeEach(() => {
  startState = {
    error: null,
    status: "idle",
    isInitialized: false,
  }
})

test("correct error message should be set", () => {
  const endState = app(startState, setAppError({ error: "some error" }))
  expect(endState.error).toBe("some error")
})

test("correct status should be set", () => {
  const endState = app(startState, setAppStatus({ status: "loading" }))
  expect(endState.status).toBe("loading")
})
