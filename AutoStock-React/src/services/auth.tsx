export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("currentUser")
    ? JSON.parse(window.localStorage.getItem("currentUser")!)
    : {}

const setUser = (user: any) =>
  window.localStorage.setItem("currentUser", JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser()
  console.log("isLoggedIn", user)
  return !!user.email
}

export const logout = (callback: any) => {
  setUser({})
  callback()
}
