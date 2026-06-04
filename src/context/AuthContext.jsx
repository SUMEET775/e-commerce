import { createContext, useState } from "react";
import { set } from "react-hook-form";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setuser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  function signUp(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "email already exists" };
    }
    const newUsers = { email, password };
    users.push(newUsers);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", JSON.stringify(email));

    setuser({ email });

    return { success: true };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, error: "invalid email or password" };
    }
    localStorage.setItem("currentUserEmail", email);
    setuser({ email });
    return { success: true };
  }

  function logOut() {
    localStorage.removeItem("currentUserEmail");
    setuser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, user, logOut, login }}>
      {children}
    </AuthContext.Provider>
  );
}
