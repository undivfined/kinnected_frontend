import React, { createContext, useState, ReactNode } from 'react';

export type ImageContextType = {
  selectedImage: string | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const defaultContextValue: ImageContextType = {
  selectedImage: undefined,
  setSelectedImage: () => {},
};

export const ImageContext = createContext<ImageContextType>(defaultContextValue);

type ImageProviderProps = {
    children: ReactNode;
  };
  
  export const ImageProvider = ({ children }: ImageProviderProps) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  
    return (
      <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
        {children}
      </ImageContext.Provider>
    );
  };
  