import { createContext, useContext } from "react";

export const DictionaryContext = createContext<any>(null);

export const useDictionary = () => useContext(DictionaryContext);