import React, { createContext, useContext } from "react";
import { colors, type ColorPalette } from "@mcp-baby-design-ui/tokens";

type ThemeContextValue = {
  palette: ColorPalette;
};

const ThemeContext = createContext<ThemeContextValue>({ palette: "primary" });

export function useTheme() {
  return useContext(ThemeContext);
}

export interface ThemeProviderProps {
  palette?: ColorPalette;
  children: React.ReactNode;
}

export const ThemeProvider = React.forwardRef<HTMLDivElement, ThemeProviderProps>(
  ({ palette = "primary", children }, ref) => {
    const paletteColors = colors[palette];
    const style = Object.entries(paletteColors).reduce(
      (acc, [shade, value]) => {
        acc[`--primary-${shade}`] = value;
        return acc;
      },
      {} as Record<string, string>,
    );

    return (
      <ThemeContext.Provider value={{ palette }}>
        <div ref={ref} style={style}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);

ThemeProvider.displayName = "ThemeProvider";
