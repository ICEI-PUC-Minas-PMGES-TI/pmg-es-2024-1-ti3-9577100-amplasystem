/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useState, useContext, ReactNode } from "react";
import customTheme from "@/styles/themes/customTheme";
import chakraTheme from "@/styles/themes/chakraTheme";
import fluentTheme from "@/styles/themes/fluentTheme";
import githubTheme from "@/styles/themes/githubTheme";
import ibmTheme from "@/styles/themes/ibmTheme";
import mantineTheme from "@/styles/themes/mantineTheme";

type ThemeName = "custom" | "chakra" | "fluent" | "github" | "ibm" | "mantine";

interface ThemeContextProps {
  theme: any; 
  switchTheme: (newThemeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const themes: Record<ThemeName, any> = {
  custom: customTheme,
  chakra: chakraTheme,
  fluent: fluentTheme,
  github: githubTheme,
  ibm: ibmTheme,
  mantine: mantineTheme,
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<ThemeName>("custom");

  const switchTheme = (newThemeName: ThemeName) => {
    if (themes[newThemeName]) {
      setThemeName(newThemeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
