import {API} from '../../Backend'

export const signup = mobile => {
    return fetch(`${API}/signup/send/otp`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(mobile)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const otpVerifierApi = user => {
  return fetch(`${API}/signup/otp/verification`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const fpSendOTP = mobile => {
  return fetch(`${API}/forgotpassword/sentotp`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mobile)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const fpVerifyOTP = data => {
  return fetch(`${API}/forgotpassword/verify`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}
  
export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
}