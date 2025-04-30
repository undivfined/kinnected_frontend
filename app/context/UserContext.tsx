import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type UserContextType = {
  userDetails: UserDetails;
  setUserDetails: Dispatch<SetStateAction<UserDetails>>;
};

export type UserDetails = {
  username: string | undefined;
  first_name: string | undefined;
  last_name: string | undefined;
  date_of_birth: string | undefined;
  timezone: string | undefined;
  avatar_url: string | undefined;
};

const defaultUser = {
  username: undefined,
  first_name: undefined,
  last_name: undefined,
  date_of_birth: undefined,
  timezone: undefined,
  avatar_url: undefined,
};

const defaultContextValue = {
  userDetails: defaultUser,
  setUserDetails: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails>(defaultUser);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
