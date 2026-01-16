import type { UserAuthInfo } from "./components/types";
import { createContext } from "react";

export const UserAuthInfoContext = createContext<UserAuthInfo | undefined>(
  undefined
);
