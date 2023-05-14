"use client";

import { SessionProvider } from "next-auth/react";

interface AuthInterface {
  children: React.ReactNode;
}

const AuthContext = ({ children }: AuthInterface) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
