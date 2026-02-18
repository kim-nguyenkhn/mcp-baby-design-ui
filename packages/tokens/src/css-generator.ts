import { colors } from "./colors.js";
import { typography } from "./typography.js";
import { spacing, radii, shadows } from "./spacing.js";

/**
 * Generate CSS custom property declarations for all design tokens
 * (or a single color palette when `palette` is provided).
 *
 * @param palette - Optional palette name to limit color output
 *                  (e.g. "primary", "secondary"). When omitted every
 *                  palette is included.
 * @returns A string containing a complete `:root { ... }` block.
 *
 * @example
 * ```ts
 * // All tokens
 * const allCSS = generateCSSVariables();
 *
 * // Only primary colors
 * const primaryCSS = generateCSSVariables("primary");
 * ```
 */
export function generateCSSVariables(palette?: string): string {
  const lines: string[] = [];

  // ---------------------------------------------------------------------------
  // Colors
  // ---------------------------------------------------------------------------
  const palettes =
    palette !== undefined
      ? { [palette]: colors[palette as keyof typeof colors] }
      : colors;

  for (const [name, shades] of Object.entries(palettes)) {
    if (shades === undefined) continue;
    for (const [shade, value] of Object.entries(shades)) {
      lines.push(`  --${name}-${shade}: ${value};`);
    }
  }

  // When generating for a single palette, skip non-color tokens.
  if (palette === undefined) {
    // -------------------------------------------------------------------------
    // Typography -- font families
    // -------------------------------------------------------------------------
    for (const [name, value] of Object.entries(typography.fontFamily)) {
      lines.push(`  --font-family-${name}: ${value};`);
    }

    // Typography -- font sizes & line heights
    for (const [name, value] of Object.entries(typography.fontSize)) {
      lines.push(`  --font-size-${name}: ${value.size};`);
      lines.push(`  --line-height-${name}: ${value.lineHeight};`);
    }

    // Typography -- font weights
    for (const [name, value] of Object.entries(typography.fontWeight)) {
      lines.push(`  --font-weight-${name}: ${value};`);
    }

    // -------------------------------------------------------------------------
    // Spacing
    // -------------------------------------------------------------------------
    for (const [key, value] of Object.entries(spacing)) {
      // Convert numeric keys like 0.5 to "0-5" for valid CSS identifiers
      const cssKey = String(key).replace(".", "-");
      lines.push(`  --spacing-${cssKey}: ${value};`);
    }

    // -------------------------------------------------------------------------
    // Border radii
    // -------------------------------------------------------------------------
    for (const [name, value] of Object.entries(radii)) {
      lines.push(`  --radius-${name}: ${value};`);
    }

    // -------------------------------------------------------------------------
    // Shadows
    // -------------------------------------------------------------------------
    for (const [name, value] of Object.entries(shadows)) {
      lines.push(`  --shadow-${name}: ${value};`);
    }
  }

  return `:root {\n${lines.join("\n")}\n}\n`;
}
