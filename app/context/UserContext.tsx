import { createContext,  useState, ReactNode } from "react"

export type UserContextType = {
  username: string | undefined;
  fullName: string | undefined;
  dob: Date | undefined;
  country: string | undefined;
  timezone: string | undefined;
  setUserDetails: React.Dispatch<React.SetStateAction<UserContextType>>;
};
const defaultContextValue: UserContextType = {
  username: undefined,
  fullName: undefined,
  dob: new Date(),
  country: undefined,
  timezone: undefined,
  setUserDetails: () => {},
};

export const UserContext = createContext<UserContextType>(defaultContextValue)

type UserProviderProps = {
    children: ReactNode;
  };

export const UserProvider = ({children}: UserProviderProps)=> {const [userDetails, setUserDetails] = useState<string | undefined>(undefined);

return (
    <UserContext.Provider value={{userDetails, setUserDetails}}>
        {children}
    </UserContext.Provider>
)
}
