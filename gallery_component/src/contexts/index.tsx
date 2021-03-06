import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import theme from "../style/theme";

interface IAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: IAppProviderProps) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);
