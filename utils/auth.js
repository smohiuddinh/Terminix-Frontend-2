

export const getToken = () => {
  try {
    const token = localStorage.getItem("token")
    return token
  } catch (err) {
    console.log("Error: ", err)
  }
};

export const setToken = (token) => {
  try {
    const settoken = localStorage.setItem("token", token)
  } catch (err) {
    console.log("Error: ", err)

  }
};

export const deleteToken = () => {
  try {
    const deletetoken = localStorage.removeItem("token")
  } catch (err) {
    console.log("Error: ", err)

  }
};
