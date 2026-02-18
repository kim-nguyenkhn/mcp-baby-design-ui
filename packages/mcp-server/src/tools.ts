/**
 * MCP tool definitions and handlers for the Baby Design UI server.
 *
 * Exposes five tools:
 *  1. list-components     -- catalogue overview
 *  2. get-component-docs  -- detailed docs for a single component
 *  3. generate-component-code -- TSX code generation
 *  4. get-theme-tokens    -- design token retrieval
 *  5. preview-component   -- text-based preview + code example
 */

import { registry, type ComponentMeta, type PropDef } from "./registry.js";
import { generateComponentCode, generateImportStatement } from "./templates.js";
import {
  colors,
  typography,
  spacing,
  radii,
  shadows,
} from "@mcp-baby-design-ui/tokens";

/* -------------------------------------------------------------------------- */
/*  Tool definitions (JSON Schema)                                             */
/* -------------------------------------------------------------------------- */

export const toolDefinitions = [
  {
    name: "list-components",
    description:
      "List all available Baby Design UI components with their descriptions and categories.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          enum: ["form", "feedback", "navigation", "data", "layout"],
          description: "Optional filter by component category.",
        },
      },
    },
  },
  {
    name: "get-component-docs",
    description:
      "Get detailed documentation for a specific component including props table, usage examples, and accessibility notes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "PascalCase component name (e.g. Button, DatePicker).",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "generate-component-code",
    description:
      "Generate ready-to-use TSX code for a Baby Design UI component with specific props.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "PascalCase component name.",
        },
        props: {
          type: "object",
          description: "Key-value pairs of props to apply to the component.",
        },
        withImport: {
          type: "boolean",
          description:
            "Whether to include the import statement. Defaults to true.",
        },
      },
      required: ["name"],
    },
  },
  {
    name: "get-theme-tokens",
    description:
      "Retrieve design tokens (colors, typography, spacing, shadows, radii) from the Baby Design UI token package.",
    inputSchema: {
      type: "object" as const,
      properties: {
        category: {
          type: "string",
          enum: ["colors", "typography", "spacing", "shadows", "radii", "all"],
          description:
            'Token category to retrieve. Use "all" for the full token set.',
        },
      },
    },
  },
  {
    name: "preview-component",
    description:
      "Get a text-based visual preview description and a code example for a component variant.",
    inputSchema: {
      type: "object" as const,
      properties: {
        name: {
          type: "string",
          description: "PascalCase component name.",
        },
        variant: {
          type: "string",
          description:
            "Optional variant to preview (e.g. filled, outline, ghost).",
        },
      },
      required: ["name"],
    },
  },
];

/* -------------------------------------------------------------------------- */
/*  Response helpers                                                           */
/* -------------------------------------------------------------------------- */

type ToolResponse = { content: { type: "text"; text: string }[] };

function textResponse(text: string): ToolResponse {
  return { content: [{ type: "text", text }] };
}

function errorResponse(message: string): ToolResponse {
  return textResponse(`Error: ${message}`);
}

/* -------------------------------------------------------------------------- */
/*  Formatting helpers                                                         */
/* -------------------------------------------------------------------------- */

function formatPropRow(prop: PropDef): string {
  const req = prop.required ? "Yes" : "No";
  const def = prop.default ?? "-";
  return `  ${prop.name}  (${prop.type})  required: ${req}  default: ${def}\n    ${prop.description}`;
}

function formatComponentSummary(meta: ComponentMeta): string {
  return `- ${meta.name} [${meta.category}]: ${meta.description}`;
}

/* -------------------------------------------------------------------------- */
/*  ASCII art preview helpers                                                  */
/* -------------------------------------------------------------------------- */

function generateAsciiPreview(
  meta: ComponentMeta,
  variant?: string,
): string {
  const v = variant ?? (meta.props.find((p) => p.name === "variant")?.default?.replace(/"/g, "") ?? "default");

  switch (meta.name) {
    case "Button":
      return buildButtonPreview(v);
    case "Input":
      return buildInputPreview();
    case "Checkbox":
      return buildCheckboxPreview();
    case "RadioButton":
      return buildRadioPreview();
    case "Toggle":
      return buildTogglePreview();
    case "Select":
      return buildSelectPreview();
    case "DatePicker":
      return buildDatePickerPreview();
    case "Slider":
      return buildSliderPreview();
    case "Tooltip":
      return buildTooltipPreview();
    case "Toast":
      return buildToastPreview(v);
    case "Modal":
      return buildModalPreview();
    case "Badge":
      return buildBadgePreview(v);
    case "Tag":
      return buildTagPreview();
    case "Pagination":
      return buildPaginationPreview();
    case "Table":
      return buildTablePreview();
    case "Tab":
      return buildTabPreview();
    case "Stepper":
      return buildStepperPreview(v);
    case "Accordion":
      return buildAccordionPreview();
    case "Breadcrumb":
      return buildBreadcrumbPreview();
    case "Avatar":
      return buildAvatarPreview();
    default:
      return `[${meta.displayName}]`;
  }
}

function buildButtonPreview(variant: string): string {
  const label = variant === "destructive" ? "Delete" : "Click Me";
  const border = variant === "outline" ? "|" : variant === "ghost" ? " " : "|";
  const fill = variant === "filled" || variant === "destructive" ? "=" : " ";
  const inner = ` ${label} `;
  const top = `+${fill.repeat(inner.length + 2)}+`;
  return `${top}\n${border} ${inner} ${border}\n${top}`;
}

function buildInputPreview(): string {
  return [
    "  Label",
    "  +------------------------------+",
    "  | Placeholder text...          |",
    "  +------------------------------+",
    "  Helper text",
  ].join("\n");
}

function buildCheckboxPreview(): string {
  return [
    "  [x] Checked option",
    "  [ ] Unchecked option",
    "  [-] Indeterminate option",
  ].join("\n");
}

function buildRadioPreview(): string {
  return [
    "  ( ) Option A",
    "  (*) Option B  <-- selected",
    "  ( ) Option C",
  ].join("\n");
}

function buildTogglePreview(): string {
  return [
    "  OFF  [  O-------]",
    "  ON   [-------O  ]",
  ].join("\n");
}

function buildSelectPreview(): string {
  return [
    "  Label",
    "  +------------------------------+",
    "  | Select...              [ v ] |",
    "  +------------------------------+",
    "  | Option 1                     |",
    "  | Option 2  *selected*         |",
    "  | Option 3                     |",
    "  +------------------------------+",
  ].join("\n");
}

function buildDatePickerPreview(): string {
  return [
    "  Label",
    "  +------------------------------+",
    "  | 2025-01-15            [ cal ]|",
    "  +------------------------------+",
    "  +---+---+---+---+---+---+---+",
    "  | S | M | T | W | T | F | S |",
    "  +---+---+---+---+---+---+---+",
    "  |   |   |   | 1 | 2 | 3 | 4 |",
    "  | 5 | 6 | 7 | 8 | 9 |10 |11 |",
    "  |12 |13 |14 |[15]|16 |17 |18 |",
    "  +---+---+---+---+---+---+---+",
  ].join("\n");
}

function buildSliderPreview(): string {
  return [
    "  Label",
    "  0 =====[O]================ 100",
    "            ^ 35",
  ].join("\n");
}

function buildTooltipPreview(): string {
  return [
    '  +-------------------+',
    '  | Tooltip content   |',
    '  +-------------------+',
    '          \\/',
    '     [ Trigger ]',
  ].join("\n");
}

function buildToastPreview(variant: string): string {
  const icon = { info: "(i)", success: "(v)", warning: "(!)", error: "(x)" }[variant] ?? "(i)";
  return [
    "  +----------------------------------+",
    `  | ${icon}  Toast Title                 |`,
    "  |     Description text goes here   |",
    "  +----------------------------------+",
  ].join("\n");
}

function buildModalPreview(): string {
  return [
    "  +====================================+",
    "  |           Modal Title         [ X ]|",
    "  |------------------------------------|",
    "  |                                    |",
    "  |   Modal body content goes here.    |",
    "  |                                    |",
    "  |              [Cancel]  [Confirm]   |",
    "  +====================================+",
  ].join("\n");
}

function buildBadgePreview(variant: string): string {
  const border = variant === "outline" ? "|" : " ";
  return `  (${border} Badge Label ${border})`;
}

function buildTagPreview(): string {
  return [
    "  [# Tag Label  x]",
    "  [# Removable  x]  [# Disabled]",
  ].join("\n");
}

function buildPaginationPreview(): string {
  return "  [<]  1  2  [3]  4  5  ...  10  [>]";
}

function buildTablePreview(): string {
  return [
    "  +----------+------------------+--------+",
    "  | Name     | Email            | Role   |",
    "  +----------+------------------+--------+",
    "  | Alice    | alice@mail.com   | Admin  |",
    "  | Bob      | bob@mail.com     | User   |",
    "  +----------+------------------+--------+",
  ].join("\n");
}

function buildTabPreview(): string {
  return [
    "  [ Overview ]  [*Settings*]  [ Billing ]",
    "  -------------------------------------------",
    "  Tab panel content for the selected tab.",
  ].join("\n");
}

function buildStepperPreview(variant: string): string {
  if (variant === "bar") {
    return [
      "  Step 1         Step 2         Step 3",
      "  [============|====>          |       ]",
    ].join("\n");
  }
  return [
    "  (1)------(2)------(3)",
    "  Done    Active    Todo",
  ].join("\n");
}

function buildAccordionPreview(): string {
  return [
    "  +--------------------------------------+",
    "  | [-] Section 1 (expanded)             |",
    "  |   Content for section 1 is visible.  |",
    "  +--------------------------------------+",
    "  | [+] Section 2 (collapsed)            |",
    "  +--------------------------------------+",
    "  | [+] Section 3 (collapsed)            |",
    "  +--------------------------------------+",
  ].join("\n");
}

function buildBreadcrumbPreview(): string {
  return "  Home  /  Products  /  **Current Page**";
}

function buildAvatarPreview(): string {
  return [
    "    +------+     +------+     +------+",
    "    | [img]|     |  AJ  |     |  +3  |",
    "    +------+     +------+     +------+",
    "     image       fallback      count",
  ].join("\n");
}

/* -------------------------------------------------------------------------- */
/*  Token formatters                                                           */
/* -------------------------------------------------------------------------- */

function formatTokenCategory(
  category: string,
): string {
  switch (category) {
    case "colors":
      return formatColors();
    case "typography":
      return formatTypography();
    case "spacing":
      return formatSpacing();
    case "shadows":
      return formatShadows();
    case "radii":
      return formatRadii();
    case "all":
      return [
        formatColors(),
        formatTypography(),
        formatSpacing(),
        formatRadii(),
        formatShadows(),
      ].join("\n\n---\n\n");
    default:
      return `Unknown token category: "${category}". Valid categories: colors, typography, spacing, shadows, radii, all.`;
  }
}

function formatColors(): string {
  const lines: string[] = ["# Color Tokens\n"];
  for (const [palette, shades] of Object.entries(colors)) {
    lines.push(`## ${palette}`);
    for (const [shade, value] of Object.entries(
      shades as Record<string, string>,
    )) {
      lines.push(`  ${shade}: hsl(${value})`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function formatTypography(): string {
  const lines: string[] = ["# Typography Tokens\n"];

  lines.push("## Font Families");
  for (const [name, value] of Object.entries(typography.fontFamily)) {
    lines.push(`  ${name}: ${value}`);
  }

  lines.push("\n## Font Sizes");
  for (const [name, value] of Object.entries(typography.fontSize)) {
    lines.push(
      `  ${name}: ${value.size} (line-height: ${value.lineHeight})`,
    );
  }

  lines.push("\n## Font Weights");
  for (const [name, value] of Object.entries(typography.fontWeight)) {
    lines.push(`  ${name}: ${value}`);
  }

  return lines.join("\n");
}

function formatSpacing(): string {
  const lines: string[] = ["# Spacing Tokens\n"];
  for (const [key, value] of Object.entries(spacing)) {
    lines.push(`  ${key}: ${value}`);
  }
  return lines.join("\n");
}

function formatRadii(): string {
  const lines: string[] = ["# Border Radius Tokens\n"];
  for (const [key, value] of Object.entries(radii)) {
    lines.push(`  ${key}: ${value}`);
  }
  return lines.join("\n");
}

function formatShadows(): string {
  const lines: string[] = ["# Shadow Tokens\n"];
  for (const [key, value] of Object.entries(shadows)) {
    lines.push(`  ${key}: ${value}`);
  }
  return lines.join("\n");
}

/* -------------------------------------------------------------------------- */
/*  Tool handler                                                               */
/* -------------------------------------------------------------------------- */

export function handleTool(
  name: string,
  args: Record<string, unknown>,
): ToolResponse {
  switch (name) {
    case "list-components":
      return handleListComponents(args);
    case "get-component-docs":
      return handleGetComponentDocs(args);
    case "generate-component-code":
      return handleGenerateComponentCode(args);
    case "get-theme-tokens":
      return handleGetThemeTokens(args);
    case "preview-component":
      return handlePreviewComponent(args);
    default:
      return errorResponse(`Unknown tool: "${name}"`);
  }
}

/* ----- 1. list-components ------------------------------------------------ */

function handleListComponents(args: Record<string, unknown>): ToolResponse {
  const categoryFilter = args["category"] as string | undefined;

  let components = Object.values(registry);
  if (categoryFilter) {
    components = components.filter((c) => c.category === categoryFilter);
  }

  if (components.length === 0) {
    return textResponse(
      categoryFilter
        ? `No components found in category "${categoryFilter}".`
        : "No components registered.",
    );
  }

  const header = categoryFilter
    ? `Baby Design UI Components (${categoryFilter})\n${"=".repeat(50)}\n`
    : `Baby Design UI Components (${components.length} total)\n${"=".repeat(50)}\n`;

  const list = components.map(formatComponentSummary).join("\n\n");

  const categories = [...new Set(Object.values(registry).map((c) => c.category))];
  const footer = categoryFilter
    ? `\nCategories: ${categories.join(", ")}`
    : `\nCategories: ${categories.join(", ")}`;

  return textResponse(`${header}\n${list}\n${footer}`);
}

/* ----- 2. get-component-docs --------------------------------------------- */

function handleGetComponentDocs(args: Record<string, unknown>): ToolResponse {
  const name = args["name"] as string;
  if (!name) {
    return errorResponse("Missing required parameter: name");
  }

  const meta = registry[name];
  if (!meta) {
    const available = Object.keys(registry).join(", ");
    return errorResponse(
      `Unknown component "${name}". Available components: ${available}`,
    );
  }

  const lines: string[] = [];

  // Header
  lines.push(`# ${meta.displayName}`);
  lines.push(`Category: ${meta.category}`);
  lines.push("");
  lines.push(meta.description);
  lines.push("");

  // Import
  lines.push("## Import");
  lines.push("```tsx");
  lines.push(generateImportStatement([meta.name]));
  lines.push("```");
  lines.push("");

  // Props
  lines.push("## Props");
  lines.push("");
  for (const prop of meta.props) {
    lines.push(formatPropRow(prop));
    lines.push("");
  }

  // Examples
  lines.push("## Examples");
  lines.push("");
  for (const example of meta.examples) {
    lines.push(`### ${example.title}`);
    lines.push("```tsx");
    lines.push(example.code);
    lines.push("```");
    lines.push("");
  }

  return textResponse(lines.join("\n"));
}

/* ----- 3. generate-component-code ---------------------------------------- */

function handleGenerateComponentCode(
  args: Record<string, unknown>,
): ToolResponse {
  const name = args["name"] as string;
  if (!name) {
    return errorResponse("Missing required parameter: name");
  }

  const meta = registry[name];
  if (!meta) {
    const available = Object.keys(registry).join(", ");
    return errorResponse(
      `Unknown component "${name}". Available components: ${available}`,
    );
  }

  const props = (args["props"] as Record<string, unknown>) ?? {};
  const withImport = args["withImport"] !== false;

  const lines: string[] = [];

  if (withImport) {
    lines.push(generateImportStatement([name]));
    lines.push("");
  }

  try {
    const code = generateComponentCode(name, props);
    lines.push(code);
  } catch (err) {
    return errorResponse(
      err instanceof Error ? err.message : "Code generation failed",
    );
  }

  return textResponse(lines.join("\n"));
}

/* ----- 4. get-theme-tokens ----------------------------------------------- */

function handleGetThemeTokens(args: Record<string, unknown>): ToolResponse {
  const category = (args["category"] as string) ?? "all";
  return textResponse(formatTokenCategory(category));
}

/* ----- 5. preview-component ---------------------------------------------- */

function handlePreviewComponent(args: Record<string, unknown>): ToolResponse {
  const name = args["name"] as string;
  if (!name) {
    return errorResponse("Missing required parameter: name");
  }

  const meta = registry[name];
  if (!meta) {
    const available = Object.keys(registry).join(", ");
    return errorResponse(
      `Unknown component "${name}". Available components: ${available}`,
    );
  }

  const variant = args["variant"] as string | undefined;
  const lines: string[] = [];

  // Header
  lines.push(`# ${meta.displayName} Preview`);
  if (variant) {
    lines.push(`Variant: ${variant}`);
  }
  lines.push("");

  // ASCII preview
  lines.push("## Visual Preview");
  lines.push("```");
  lines.push(generateAsciiPreview(meta, variant));
  lines.push("```");
  lines.push("");

  // Description
  lines.push("## Description");
  lines.push(meta.description);
  lines.push("");

  // Pick the best matching example
  const matchingExample = variant
    ? meta.examples.find(
        (e) =>
          e.title.toLowerCase().includes(variant.toLowerCase()) ||
          e.code.toLowerCase().includes(`variant="${variant.toLowerCase()}"`),
      ) ?? meta.examples[0]
    : meta.examples[0];

  if (matchingExample) {
    lines.push(`## Code Example: ${matchingExample.title}`);
    lines.push("```tsx");
    lines.push(generateImportStatement([name]));
    lines.push("");
    lines.push(matchingExample.code);
    lines.push("```");
  }

  // Quick prop reference
  lines.push("");
  lines.push("## Quick Prop Reference");
  const requiredProps = meta.props.filter((p) => p.required);
  const optionalProps = meta.props.filter((p) => !p.required);
  if (requiredProps.length > 0) {
    lines.push(
      `Required: ${requiredProps.map((p) => p.name).join(", ")}`,
    );
  }
  if (optionalProps.length > 0) {
    lines.push(
      `Optional: ${optionalProps.map((p) => p.name).join(", ")}`,
    );
  }

  return textResponse(lines.join("\n"));
}
