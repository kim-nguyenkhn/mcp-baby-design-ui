/**
 * Code template engine -- generates valid TSX snippets for Baby Design UI
 * components given a component name and a set of props.
 */

import { registry, type ComponentMeta } from "./registry.js";

/* -------------------------------------------------------------------------- */
/*  Prop serialisation helpers                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Serialise a single prop value into its JSX attribute string.
 *
 * Rules:
 *  - `true`  -> bare attribute name (e.g. `disabled`)
 *  - `false` -> explicit `={false}`
 *  - string  -> `="value"`
 *  - number  -> `={42}`
 *  - array / object -> `={...}` via JSON with light formatting
 *  - function string (starts with "()") -> `={<value>}`
 */
function serialisePropValue(key: string, value: unknown): string {
  if (value === true) {
    return key;
  }
  if (value === false) {
    return `${key}={false}`;
  }
  if (typeof value === "string") {
    // Detect function-like strings
    if (
      value.startsWith("() =>") ||
      value.startsWith("(") ||
      value.startsWith("function")
    ) {
      return `${key}={${value}}`;
    }
    // Detect JSX element references like <Icon />
    if (value.startsWith("<")) {
      return `${key}={${value}}`;
    }
    // Detect raw expression references (e.g. variable names, expressions)
    if (/^[a-zA-Z_$][a-zA-Z0-9_$.]*$/.test(value) && !value.includes(" ")) {
      // Could be a variable reference -- check if it looks like a known literal
      // We treat anything that is purely lowercase alpha as a possible string literal,
      // but CamelCase or expressions as variables.
      if (value[0] === value[0].toUpperCase() || value.includes(".")) {
        return `${key}={${value}}`;
      }
    }
    return `${key}="${escapeJsxString(value)}"`;
  }
  if (typeof value === "number") {
    return `${key}={${value}}`;
  }
  if (Array.isArray(value)) {
    return `${key}={${formatJsxExpression(value)}}`;
  }
  if (typeof value === "object" && value !== null) {
    return `${key}={${formatJsxExpression(value)}}`;
  }
  // fallback
  return `${key}={${JSON.stringify(value)}}`;
}

function escapeJsxString(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/**
 * Pretty-print a JS value for embedding in JSX `={...}` expressions.
 */
function formatJsxExpression(value: unknown): string {
  if (Array.isArray(value)) {
    const items = value.map((item) => {
      if (typeof item === "object" && item !== null) {
        return formatObject(item as Record<string, unknown>);
      }
      return JSON.stringify(item);
    });
    if (items.join(", ").length < 60) {
      return `[${items.join(", ")}]`;
    }
    return `[\n    ${items.join(",\n    ")}\n  ]`;
  }
  if (typeof value === "object" && value !== null) {
    return formatObject(value as Record<string, unknown>);
  }
  return JSON.stringify(value);
}

function formatObject(obj: Record<string, unknown>): string {
  const entries = Object.entries(obj).map(([k, v]) => {
    const needsQuotes = /[^a-zA-Z0-9_$]/.test(k);
    const key = needsQuotes ? `"${k}"` : k;
    if (typeof v === "string") {
      return `${key}: "${escapeJsxString(v)}"`;
    }
    if (typeof v === "object" && v !== null) {
      return `${key}: ${formatJsxExpression(v)}`;
    }
    return `${key}: ${JSON.stringify(v)}`;
  });
  if (entries.join(", ").length < 60) {
    return `{ ${entries.join(", ")} }`;
  }
  return `{\n    ${entries.join(",\n    ")}\n  }`;
}

/* -------------------------------------------------------------------------- */
/*  Code generation                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Build an array of JSX attribute strings from a props object, filtered
 * against the component's known prop definitions.
 */
function buildPropStrings(
  meta: ComponentMeta,
  props: Record<string, unknown>,
): string[] {
  const propStrings: string[] = [];

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    // "children" is handled separately
    if (key === "children") continue;
    propStrings.push(serialisePropValue(key, value));
  }

  return propStrings;
}

/**
 * Generate a complete TSX code snippet for a component with the given props.
 *
 * @param componentName  PascalCase component name (e.g. "Button")
 * @param props          Key-value prop overrides
 * @returns              A formatted TSX string
 */
export function generateComponentCode(
  componentName: string,
  props: Record<string, unknown>,
): string {
  const meta = registry[componentName];
  if (!meta) {
    throw new Error(`Unknown component: ${componentName}`);
  }

  const propStrings = buildPropStrings(meta, props);
  const children = props["children"] as string | undefined;

  // Determine the tag name -- for compound components we still use the
  // primary name as the outer wrapper.
  const tag = componentName;

  if (children !== undefined && children !== null) {
    const attrsStr = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : "";
    if (propStrings.length > 3) {
      // Multi-line formatting for many props
      const indentedProps = propStrings.map((p) => `  ${p}`).join("\n");
      return `<${tag}\n${indentedProps}\n>\n  ${String(children)}\n</${tag}>`;
    }
    return `<${tag}${attrsStr}>\n  ${String(children)}\n</${tag}>`;
  }

  // Self-closing tag
  if (propStrings.length > 3) {
    const indentedProps = propStrings.map((p) => `  ${p}`).join("\n");
    return `<${tag}\n${indentedProps}\n/>`;
  }
  const attrsStr = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : "";
  return `<${tag}${attrsStr} />`;
}

/**
 * Build an import statement for one or more Baby Design UI components.
 */
export function generateImportStatement(componentNames: string[]): string {
  const uniqueNames = [...new Set(componentNames)];
  return `import { ${uniqueNames.join(", ")} } from "@mcp-baby-design-ui/react";`;
}
