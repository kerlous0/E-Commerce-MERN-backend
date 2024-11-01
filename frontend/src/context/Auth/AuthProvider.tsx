import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [name, setName] = useState<string | null>(localStorage.getItem("name"));
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (name: string, email: string, token: string) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("token", token);
    setName(name);
    setEmail(email);
    setToken(token);
  };
  return (
    <AuthContext.Provider value={{ name, email, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
