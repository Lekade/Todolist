export type TestAction<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">
