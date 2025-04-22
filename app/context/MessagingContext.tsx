import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface MessagingContextType {
  channel: any;
  setChannel: Dispatch<SetStateAction<any>>;
  thread: any;
  setThread: Dispatch<SetStateAction<any>>;
}

export const MessagingContext = createContext<MessagingContextType>({
  channel: null,
  setChannel: () => {},
  thread: null,
  setThread: () => {},
});


interface MessagingProviderProps {
  children: ReactNode;
}

export const MessagingProvider = ({ children }: MessagingProviderProps) => {
  const [channel, setChannel] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);

  return (
    <MessagingContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessagingContext = () => useContext(MessagingContext);