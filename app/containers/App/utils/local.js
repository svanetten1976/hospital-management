export const set = (key, data) =>
  localStorage.setItem(key, JSON.stringify(data))
export const get = key => JSON.parse(localStorage.getItem(key))
export const remove = key => localStorage.removeItem(key)
export const clear = () => localStorage.clear()
export const key = k => localStorage.key(k)
