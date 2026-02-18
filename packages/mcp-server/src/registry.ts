/**
 * Component registry -- comprehensive metadata for all Baby Design UI
 * components.  This is a pure data file with zero React imports.
 */

export interface PropDef {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description: string;
}

export interface ComponentMeta {
  name: string;
  displayName: string;
  description: string;
  category: "form" | "feedback" | "navigation" | "data" | "layout";
  props: PropDef[];
  examples: { title: string; code: string }[];
}

export const registry: Record<string, ComponentMeta> = {
  /* ------------------------------------------------------------------
   * 1. Button
   * ----------------------------------------------------------------*/
  Button: {
    name: "Button",
    displayName: "Button",
    description:
      "A versatile button component with multiple variants, sizes, loading state, and optional left/right icons. Supports all standard HTML button attributes.",
    category: "form",
    props: [
      {
        name: "variant",
        type: '"filled" | "outline" | "ghost" | "destructive"',
        required: false,
        default: '"filled"',
        description: "Visual style variant of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Controls the padding, font-size, and height of the button.",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        default: "false",
        description:
          "When true the button shows a spinner, disables interaction, and sets aria-busy.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the button and applies disabled styling.",
      },
      {
        name: "leftIcon",
        type: "ReactNode",
        required: false,
        description: "Icon element rendered before the button label.",
      },
      {
        name: "rightIcon",
        type: "ReactNode",
        required: false,
        description: "Icon element rendered after the button label.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The button label content.",
      },
      {
        name: "onClick",
        type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
        required: false,
        description: "Click handler callback.",
      },
    ],
    examples: [
      {
        title: "Basic filled button",
        code: `<Button variant="filled" size="md" onClick={() => console.log("clicked")}>
  Save Changes
</Button>`,
      },
      {
        title: "Outline button with icons",
        code: `<Button variant="outline" leftIcon={<PlusIcon />} rightIcon={<ArrowRightIcon />}>
  Add Item
</Button>`,
      },
      {
        title: "Loading destructive button",
        code: `<Button variant="destructive" loading>
  Deleting...
</Button>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 2. Input
   * ----------------------------------------------------------------*/
  Input: {
    name: "Input",
    displayName: "Input",
    description:
      "A text input field with label, helper text, error state, character count, and optional left/right icon slots.",
    category: "form",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label displayed above the input.",
      },
      {
        name: "helperText",
        type: "string",
        required: false,
        description: "Assistive text rendered below the input.",
      },
      {
        name: "error",
        type: "string",
        required: false,
        description:
          "Error message. When set the input shows an error ring and the message replaces helperText.",
      },
      {
        name: "maxLength",
        type: "number",
        required: false,
        description: "Maximum character count. Displays a live counter when set.",
      },
      {
        name: "type",
        type: '"text" | "email" | "password" | "number" | "tel" | "url"',
        required: false,
        default: '"text"',
        description: "HTML input type attribute.",
      },
      {
        name: "leftIcon",
        type: "ReactNode",
        required: false,
        description: "Icon rendered inside the input on the left.",
      },
      {
        name: "rightIcon",
        type: "ReactNode",
        required: false,
        description: "Icon rendered inside the input on the right.",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        description: "Placeholder text shown when the input is empty.",
      },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Controlled value of the input.",
      },
      {
        name: "onChange",
        type: "(event: React.ChangeEvent<HTMLInputElement>) => void",
        required: false,
        description: "Change handler callback.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the input.",
      },
    ],
    examples: [
      {
        title: "Basic labeled input",
        code: `<Input label="Email" type="email" placeholder="you@example.com" />`,
      },
      {
        title: "Input with error",
        code: `<Input
  label="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  error="Username is already taken"
/>`,
      },
      {
        title: "Input with icons and character limit",
        code: `<Input
  label="Search"
  leftIcon={<SearchIcon />}
  rightIcon={<ClearIcon />}
  maxLength={100}
  placeholder="Search components..."
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 3. Checkbox
   * ----------------------------------------------------------------*/
  Checkbox: {
    name: "Checkbox",
    displayName: "Checkbox",
    description:
      "A checkbox control supporting checked, unchecked, and indeterminate states with an optional label.",
    category: "form",
    props: [
      {
        name: "checked",
        type: "boolean",
        required: false,
        default: "false",
        description: "Whether the checkbox is checked.",
      },
      {
        name: "indeterminate",
        type: "boolean",
        required: false,
        default: "false",
        description: "Show an indeterminate (minus) icon instead of a checkmark.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Text label displayed beside the checkbox.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables interaction and applies dimmed styling.",
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        required: false,
        description: "Callback fired when the checked state changes.",
      },
    ],
    examples: [
      {
        title: "Basic checkbox",
        code: `<Checkbox label="Accept terms and conditions" checked={accepted} onChange={setAccepted} />`,
      },
      {
        title: "Indeterminate checkbox",
        code: `<Checkbox indeterminate label="Select all" onChange={handleSelectAll} />`,
      },
      {
        title: "Disabled checkbox",
        code: `<Checkbox label="Premium feature" checked disabled />`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 4. RadioButton / RadioGroup
   * ----------------------------------------------------------------*/
  RadioButton: {
    name: "RadioButton",
    displayName: "Radio Button",
    description:
      "Radio buttons allow users to select exactly one option from a set. Use RadioGroup as the container and RadioButton for each option.",
    category: "form",
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        description:
          "(RadioGroup) The currently selected value. (RadioButton) The value this option represents.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: true,
        description: "(RadioGroup) Callback fired when the selection changes.",
      },
      {
        name: "name",
        type: "string",
        required: true,
        description: "(RadioGroup) The name attribute shared by all radios in the group.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: false,
        default: '"vertical"',
        description: "(RadioGroup) Layout direction of the radio buttons.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "(RadioButton) Text label displayed beside the radio circle.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "(RadioButton) Disables this individual radio option.",
      },
    ],
    examples: [
      {
        title: "Vertical radio group",
        code: `<RadioGroup name="size" value={size} onChange={setSize}>
  <RadioButton value="sm" label="Small" />
  <RadioButton value="md" label="Medium" />
  <RadioButton value="lg" label="Large" />
</RadioGroup>`,
      },
      {
        title: "Horizontal radio group",
        code: `<RadioGroup name="color" value={color} onChange={setColor} orientation="horizontal">
  <RadioButton value="pink" label="Pink" />
  <RadioButton value="blue" label="Blue" />
  <RadioButton value="green" label="Green" />
</RadioGroup>`,
      },
      {
        title: "Radio group with disabled option",
        code: `<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <RadioButton value="free" label="Free" />
  <RadioButton value="pro" label="Pro" />
  <RadioButton value="enterprise" label="Enterprise" disabled />
</RadioGroup>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 5. Toggle
   * ----------------------------------------------------------------*/
  Toggle: {
    name: "Toggle",
    displayName: "Toggle",
    description:
      "A toggle switch for boolean on/off states. Renders as a sliding pill with an accessible role of switch.",
    category: "form",
    props: [
      {
        name: "checked",
        type: "boolean",
        required: true,
        description: "Whether the toggle is on.",
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        required: true,
        description: "Callback fired when the toggle state changes.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Accessible label displayed beside the toggle.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables interaction.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        required: false,
        default: '"md"',
        description: "Size of the toggle track and thumb.",
      },
    ],
    examples: [
      {
        title: "Basic toggle",
        code: `<Toggle checked={darkMode} onChange={setDarkMode} label="Dark mode" />`,
      },
      {
        title: "Small disabled toggle",
        code: `<Toggle checked={false} onChange={() => {}} size="sm" label="Notifications" disabled />`,
      },
      {
        title: "Large toggle without label",
        code: `<Toggle checked={enabled} onChange={setEnabled} size="lg" />`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 6. Select
   * ----------------------------------------------------------------*/
  Select: {
    name: "Select",
    displayName: "Select",
    description:
      "A dropdown select component with search, multi-select, and custom option rendering. Implements combobox pattern for accessibility.",
    category: "form",
    props: [
      {
        name: "options",
        type: "Array<{ label: string; value: string; disabled?: boolean }>",
        required: true,
        description: "The list of selectable options.",
      },
      {
        name: "value",
        type: "string | string[]",
        required: false,
        description: "The currently selected value(s).",
      },
      {
        name: "onChange",
        type: "(value: string | string[]) => void",
        required: true,
        description: "Callback fired when the selection changes.",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        default: '"Select..."',
        description: "Placeholder text when no option is selected.",
      },
      {
        name: "searchable",
        type: "boolean",
        required: false,
        default: "false",
        description: "Enables a search/filter input within the dropdown.",
      },
      {
        name: "multiple",
        type: "boolean",
        required: false,
        default: "false",
        description: "Allow selecting multiple options.",
      },
      {
        name: "error",
        type: "string",
        required: false,
        description: "Error message displayed below the select.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label displayed above the select.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the select.",
      },
    ],
    examples: [
      {
        title: "Basic select",
        code: `<Select
  label="Country"
  options={[
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "Mexico", value: "mx" },
  ]}
  value={country}
  onChange={setCountry}
/>`,
      },
      {
        title: "Searchable multi-select",
        code: `<Select
  label="Tags"
  options={tagOptions}
  value={selectedTags}
  onChange={setSelectedTags}
  searchable
  multiple
  placeholder="Choose tags..."
/>`,
      },
      {
        title: "Select with error",
        code: `<Select
  label="Category"
  options={categories}
  value={category}
  onChange={setCategory}
  error="Please select a category"
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 7. DatePicker
   * ----------------------------------------------------------------*/
  DatePicker: {
    name: "DatePicker",
    displayName: "Date Picker",
    description:
      "A calendar-based date picker with min/max date constraints, keyboard navigation, and locale-aware formatting.",
    category: "form",
    props: [
      {
        name: "value",
        type: "Date | null",
        required: false,
        description: "The currently selected date.",
      },
      {
        name: "onChange",
        type: "(date: Date | null) => void",
        required: true,
        description: "Callback fired when the selected date changes.",
      },
      {
        name: "minDate",
        type: "Date",
        required: false,
        description: "Earliest selectable date.",
      },
      {
        name: "maxDate",
        type: "Date",
        required: false,
        description: "Latest selectable date.",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        default: '"Select a date"',
        description: "Placeholder text when no date is selected.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label displayed above the date picker.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the date picker.",
      },
    ],
    examples: [
      {
        title: "Basic date picker",
        code: `<DatePicker label="Birth date" value={birthDate} onChange={setBirthDate} />`,
      },
      {
        title: "Date picker with constraints",
        code: `<DatePicker
  label="Appointment"
  value={date}
  onChange={setDate}
  minDate={new Date()}
  maxDate={new Date(2026, 11, 31)}
  placeholder="Pick a date..."
/>`,
      },
      {
        title: "Disabled date picker",
        code: `<DatePicker label="Locked date" value={new Date(2025, 0, 1)} onChange={() => {}} disabled />`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 8. Slider
   * ----------------------------------------------------------------*/
  Slider: {
    name: "Slider",
    displayName: "Slider",
    description:
      "A range slider for selecting a numeric value within a defined range. Supports custom step increments, disabled state, and an optional value display.",
    category: "form",
    props: [
      {
        name: "value",
        type: "number",
        required: true,
        description: "Current value of the slider.",
      },
      {
        name: "onChange",
        type: "(value: number) => void",
        required: true,
        description: "Callback fired when the value changes.",
      },
      {
        name: "min",
        type: "number",
        required: false,
        default: "0",
        description: "Minimum value.",
      },
      {
        name: "max",
        type: "number",
        required: false,
        default: "100",
        description: "Maximum value.",
      },
      {
        name: "step",
        type: "number",
        required: false,
        default: "1",
        description: "Step increment between values.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the slider.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Accessible label for the slider.",
      },
      {
        name: "showValue",
        type: "boolean",
        required: false,
        default: "false",
        description: "Displays the current value next to the slider.",
      },
    ],
    examples: [
      {
        title: "Basic slider",
        code: `<Slider value={volume} onChange={setVolume} min={0} max={100} label="Volume" />`,
      },
      {
        title: "Slider with step and value display",
        code: `<Slider
  value={brightness}
  onChange={setBrightness}
  min={0}
  max={100}
  step={5}
  showValue
  label="Brightness"
/>`,
      },
      {
        title: "Disabled slider",
        code: `<Slider value={50} onChange={() => {}} disabled label="Locked" />`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 9. Tooltip
   * ----------------------------------------------------------------*/
  Tooltip: {
    name: "Tooltip",
    displayName: "Tooltip",
    description:
      "A small overlay that displays additional information when hovering or focusing on a trigger element. Supports configurable position and delay.",
    category: "feedback",
    props: [
      {
        name: "content",
        type: "ReactNode",
        required: true,
        description: "The content displayed inside the tooltip.",
      },
      {
        name: "position",
        type: '"top" | "right" | "bottom" | "left"',
        required: false,
        default: '"top"',
        description: "Preferred position of the tooltip relative to the trigger.",
      },
      {
        name: "delay",
        type: "number",
        required: false,
        default: "200",
        description: "Delay in milliseconds before the tooltip appears.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The trigger element that the tooltip wraps.",
      },
    ],
    examples: [
      {
        title: "Basic tooltip",
        code: `<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`,
      },
      {
        title: "Tooltip with custom position",
        code: `<Tooltip content="More options available" position="right" delay={400}>
  <IconButton icon={<MoreIcon />} />
</Tooltip>`,
      },
      {
        title: "Tooltip on icon",
        code: `<Tooltip content="This field is required" position="bottom">
  <InfoIcon />
</Tooltip>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 10. Toast
   * ----------------------------------------------------------------*/
  Toast: {
    name: "Toast",
    displayName: "Toast",
    description:
      "A temporary notification message that slides in from the edge of the screen. Supports info, success, warning, and error variants with auto-dismiss.",
    category: "feedback",
    props: [
      {
        name: "variant",
        type: '"info" | "success" | "warning" | "error"',
        required: false,
        default: '"info"',
        description: "Visual style variant indicating severity.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "Primary toast heading.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Optional secondary description text.",
      },
      {
        name: "duration",
        type: "number",
        required: false,
        default: "5000",
        description: "Auto-dismiss duration in milliseconds. Set to 0 to disable.",
      },
      {
        name: "onClose",
        type: "() => void",
        required: false,
        description: "Callback fired when the toast is dismissed.",
      },
    ],
    examples: [
      {
        title: "Success toast",
        code: `<Toast variant="success" title="Saved!" description="Your changes have been saved." />`,
      },
      {
        title: "Error toast with long duration",
        code: `<Toast variant="error" title="Upload failed" description="The file exceeds the 10MB limit." duration={10000} />`,
      },
      {
        title: "Info toast with close handler",
        code: `<Toast
  variant="info"
  title="New version available"
  description="Refresh to update."
  onClose={() => dismissNotification()}
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 11. Modal
   * ----------------------------------------------------------------*/
  Modal: {
    name: "Modal",
    displayName: "Modal",
    description:
      "A dialog overlay that focuses user attention on a specific task. Traps focus, closes on Escape, and supports multiple sizes.",
    category: "layout",
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        description: "Controls whether the modal is visible.",
      },
      {
        name: "onClose",
        type: "() => void",
        required: true,
        description: "Callback fired when the modal is dismissed (Escape or overlay click).",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Width of the modal dialog.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The modal body content.",
      },
      {
        name: "title",
        type: "string",
        required: false,
        description: "Optional modal header title.",
      },
    ],
    examples: [
      {
        title: "Basic confirmation modal",
        code: `<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Confirm delete">
  <p>Are you sure you want to delete this item?</p>
  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
  </div>
</Modal>`,
      },
      {
        title: "Large modal with form",
        code: `<Modal open={showForm} onClose={closeForm} size="lg" title="Create new project">
  <Input label="Project name" value={name} onChange={(e) => setName(e.target.value)} />
  <Select label="Template" options={templates} value={template} onChange={setTemplate} />
  <Button onClick={handleCreate}>Create</Button>
</Modal>`,
      },
      {
        title: "Small informational modal",
        code: `<Modal open={showInfo} onClose={() => setShowInfo(false)} size="sm" title="Tip">
  <p>You can use keyboard shortcuts to navigate faster.</p>
</Modal>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 12. Badge
   * ----------------------------------------------------------------*/
  Badge: {
    name: "Badge",
    displayName: "Badge",
    description:
      "A small label component for status indicators, counts, or categorization. Supports filled and outline variants with theme colors.",
    category: "data",
    props: [
      {
        name: "variant",
        type: '"filled" | "outline"',
        required: false,
        default: '"filled"',
        description: "Visual style of the badge.",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral"',
        required: false,
        default: '"primary"',
        description: "Theme color of the badge.",
      },
      {
        name: "size",
        type: '"sm" | "md"',
        required: false,
        default: '"md"',
        description: "Size of the badge.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Badge label content.",
      },
    ],
    examples: [
      {
        title: "Filled success badge",
        code: `<Badge variant="filled" color="success">Active</Badge>`,
      },
      {
        title: "Outline warning badge",
        code: `<Badge variant="outline" color="warning" size="sm">Pending</Badge>`,
      },
      {
        title: "Badge in a list item",
        code: `<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <span>Notifications</span>
  <Badge color="error">3</Badge>
</div>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 13. Tag
   * ----------------------------------------------------------------*/
  Tag: {
    name: "Tag",
    displayName: "Tag",
    description:
      "A compact element for labels, filters, or selections. Supports removable tags with an icon slot and disabled state.",
    category: "data",
    props: [
      {
        name: "variant",
        type: '"filled" | "outline"',
        required: false,
        default: '"filled"',
        description: "Visual style of the tag.",
      },
      {
        name: "color",
        type: '"primary" | "secondary" | "success" | "warning" | "error" | "info" | "neutral"',
        required: false,
        default: '"primary"',
        description: "Theme color of the tag.",
      },
      {
        name: "onRemove",
        type: "() => void",
        required: false,
        description: "When provided a close button is shown. Callback fired on remove.",
      },
      {
        name: "icon",
        type: "ReactNode",
        required: false,
        description: "Optional icon rendered before the tag label.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "Disables the tag and its remove action.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Tag label content.",
      },
    ],
    examples: [
      {
        title: "Basic tag",
        code: `<Tag color="primary">React</Tag>`,
      },
      {
        title: "Removable tag",
        code: `<Tag color="info" onRemove={() => removeTag("typescript")}>TypeScript</Tag>`,
      },
      {
        title: "Tag with icon, disabled",
        code: `<Tag color="secondary" icon={<StarIcon />} disabled>Featured</Tag>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 14. Pagination
   * ----------------------------------------------------------------*/
  Pagination: {
    name: "Pagination",
    displayName: "Pagination",
    description:
      "A page navigation component with previous/next buttons, page numbers, and configurable sibling count for ellipsis display.",
    category: "navigation",
    props: [
      {
        name: "totalPages",
        type: "number",
        required: true,
        description: "Total number of pages.",
      },
      {
        name: "currentPage",
        type: "number",
        required: true,
        description: "The current active page (1-indexed).",
      },
      {
        name: "onPageChange",
        type: "(page: number) => void",
        required: true,
        description: "Callback fired when a page is selected.",
      },
      {
        name: "siblingCount",
        type: "number",
        required: false,
        default: "1",
        description: "Number of sibling pages shown around the current page before ellipsis.",
      },
    ],
    examples: [
      {
        title: "Basic pagination",
        code: `<Pagination totalPages={10} currentPage={page} onPageChange={setPage} />`,
      },
      {
        title: "Pagination with more siblings",
        code: `<Pagination totalPages={50} currentPage={currentPage} onPageChange={setCurrentPage} siblingCount={2} />`,
      },
      {
        title: "Small pagination",
        code: `<Pagination totalPages={3} currentPage={1} onPageChange={handlePageChange} />`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 15. Table
   * ----------------------------------------------------------------*/
  Table: {
    name: "Table",
    displayName: "Table",
    description:
      "A compound table component with sortable columns. Uses Table, TableHeader, TableBody, TableRow, and TableCell sub-components.",
    category: "data",
    props: [
      {
        name: "sortable",
        type: "boolean",
        required: false,
        default: "false",
        description: "(Table) Enable column sorting across all columns.",
      },
      {
        name: "onSort",
        type: "(column: string, direction: 'asc' | 'desc') => void",
        required: false,
        description: "(Table) Callback fired when a sortable column header is clicked.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Table sub-components (TableHeader, TableBody).",
      },
      {
        name: "column",
        type: "string",
        required: false,
        description: "(TableCell in header) Column key used for sort identification.",
      },
      {
        name: "align",
        type: '"left" | "center" | "right"',
        required: false,
        default: '"left"',
        description: "(TableCell) Text alignment within the cell.",
      },
    ],
    examples: [
      {
        title: "Basic table",
        code: `<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Role</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Alice</TableCell>
      <TableCell>alice@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
      },
      {
        title: "Sortable table",
        code: `<Table sortable onSort={(col, dir) => handleSort(col, dir)}>
  <TableHeader>
    <TableRow>
      <TableCell column="name">Name</TableCell>
      <TableCell column="date">Date</TableCell>
      <TableCell column="amount" align="right">Amount</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {rows.map((row) => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 16. Tab / Tabs
   * ----------------------------------------------------------------*/
  Tab: {
    name: "Tab",
    displayName: "Tabs",
    description:
      "A tabbed interface for switching between content panels. Use Tabs as the container and TabItem for each tab.",
    category: "navigation",
    props: [
      {
        name: "value",
        type: "string",
        required: true,
        description: "(Tabs) The value of the currently active tab.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: true,
        description: "(Tabs) Callback fired when a tab is selected.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: false,
        default: '"horizontal"',
        description: "(Tabs) Layout orientation of the tab list.",
      },
      {
        name: "label",
        type: "string",
        required: true,
        description: "(TabItem) Display label for the tab.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "(TabItem) Disables this tab.",
      },
    ],
    examples: [
      {
        title: "Basic horizontal tabs",
        code: `<Tabs value={activeTab} onChange={setActiveTab}>
  <TabItem value="overview" label="Overview" />
  <TabItem value="settings" label="Settings" />
  <TabItem value="billing" label="Billing" />
</Tabs>`,
      },
      {
        title: "Vertical tabs with disabled item",
        code: `<Tabs value={tab} onChange={setTab} orientation="vertical">
  <TabItem value="profile" label="Profile" />
  <TabItem value="security" label="Security" />
  <TabItem value="api" label="API Keys" disabled />
</Tabs>`,
      },
      {
        title: "Tabs with content panels",
        code: `<Tabs value={activeTab} onChange={setActiveTab}>
  <TabItem value="code" label="Code" />
  <TabItem value="preview" label="Preview" />
</Tabs>
{activeTab === "code" && <CodeEditor />}
{activeTab === "preview" && <Preview />}`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 17. Stepper
   * ----------------------------------------------------------------*/
  Stepper: {
    name: "Stepper",
    displayName: "Stepper",
    description:
      "A step-by-step progress indicator for multi-step workflows. Supports numbered and bar variants with vertical or horizontal orientation.",
    category: "navigation",
    props: [
      {
        name: "steps",
        type: 'Array<{ label: string; description?: string }>',
        required: true,
        description: "Array of step definitions.",
      },
      {
        name: "activeStep",
        type: "number",
        required: true,
        description: "Zero-based index of the current active step.",
      },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        required: false,
        default: '"horizontal"',
        description: "Layout direction of the stepper.",
      },
      {
        name: "variant",
        type: '"numbered" | "bar"',
        required: false,
        default: '"numbered"',
        description:
          'Display variant. "numbered" shows step numbers, "bar" shows a progress bar.',
      },
    ],
    examples: [
      {
        title: "Numbered horizontal stepper",
        code: `<Stepper
  steps={[
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Set up your profile" },
    { label: "Review", description: "Confirm details" },
  ]}
  activeStep={1}
/>`,
      },
      {
        title: "Bar variant stepper",
        code: `<Stepper
  steps={[{ label: "Upload" }, { label: "Process" }, { label: "Complete" }]}
  activeStep={2}
  variant="bar"
/>`,
      },
      {
        title: "Vertical stepper",
        code: `<Stepper
  steps={[
    { label: "Order placed" },
    { label: "Shipped" },
    { label: "Delivered" },
  ]}
  activeStep={0}
  orientation="vertical"
/>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 18. Accordion
   * ----------------------------------------------------------------*/
  Accordion: {
    name: "Accordion",
    displayName: "Accordion",
    description:
      "A vertically stacked set of expandable panels. Supports single or multiple open panels. Use AccordionItem for each section.",
    category: "layout",
    props: [
      {
        name: "type",
        type: '"single" | "multiple"',
        required: false,
        default: '"single"',
        description:
          '"single" allows only one panel open at a time; "multiple" allows any number.',
      },
      {
        name: "value",
        type: "string | string[]",
        required: false,
        description:
          "Controlled open panel value(s). String for single type, array for multiple.",
      },
      {
        name: "onChange",
        type: "(value: string | string[]) => void",
        required: false,
        description: "Callback fired when open panels change.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description: "(AccordionItem) The header text for the panel.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        default: "false",
        description: "(AccordionItem) Disables expanding/collapsing this panel.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "(AccordionItem) The panel body content.",
      },
    ],
    examples: [
      {
        title: "Single accordion",
        code: `<Accordion type="single" value={openPanel} onChange={setOpenPanel}>
  <AccordionItem value="faq-1" title="What is Baby Design UI?">
    A soft, pastel-themed React component library for modern applications.
  </AccordionItem>
  <AccordionItem value="faq-2" title="Is it accessible?">
    Yes! All components follow WAI-ARIA guidelines.
  </AccordionItem>
  <AccordionItem value="faq-3" title="Can I customize the theme?">
    Absolutely. Use design tokens to adjust colors, spacing, and typography.
  </AccordionItem>
</Accordion>`,
      },
      {
        title: "Multiple accordion",
        code: `<Accordion type="multiple" value={openPanels} onChange={setOpenPanels}>
  <AccordionItem value="section-1" title="General Settings">
    <Input label="Site name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
  </AccordionItem>
  <AccordionItem value="section-2" title="Advanced">
    <Toggle checked={devMode} onChange={setDevMode} label="Developer mode" />
  </AccordionItem>
</Accordion>`,
      },
      {
        title: "Accordion with disabled item",
        code: `<Accordion type="single">
  <AccordionItem value="a" title="Available">Content here</AccordionItem>
  <AccordionItem value="b" title="Locked" disabled>Premium content</AccordionItem>
</Accordion>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 19. Breadcrumb
   * ----------------------------------------------------------------*/
  Breadcrumb: {
    name: "Breadcrumb",
    displayName: "Breadcrumb",
    description:
      "A navigation aid showing the user's current location within a hierarchy. Supports custom separators and current page indication.",
    category: "navigation",
    props: [
      {
        name: "separator",
        type: "ReactNode",
        required: false,
        default: '"/"',
        description: "(Breadcrumb) Custom separator element between items.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "(Breadcrumb) BreadcrumbItem children.",
      },
      {
        name: "href",
        type: "string",
        required: false,
        description:
          "(BreadcrumbItem) Navigation URL. If omitted the item renders as plain text.",
      },
      {
        name: "isCurrent",
        type: "boolean",
        required: false,
        default: "false",
        description:
          '(BreadcrumbItem) Marks this item as the current page (sets aria-current="page").',
      },
    ],
    examples: [
      {
        title: "Basic breadcrumb",
        code: `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Baby Monitors</BreadcrumbItem>
</Breadcrumb>`,
      },
      {
        title: "Breadcrumb with custom separator",
        code: `<Breadcrumb separator={<ChevronRightIcon />}>
  <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="/dashboard/settings">Settings</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Profile</BreadcrumbItem>
</Breadcrumb>`,
      },
      {
        title: "Two-level breadcrumb",
        code: `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>About</BreadcrumbItem>
</Breadcrumb>`,
      },
    ],
  },

  /* ------------------------------------------------------------------
   * 20. Avatar
   * ----------------------------------------------------------------*/
  Avatar: {
    name: "Avatar",
    displayName: "Avatar",
    description:
      "A profile image component with fallback initials or icon. Supports multiple sizes and circle or square shapes.",
    category: "data",
    props: [
      {
        name: "src",
        type: "string",
        required: false,
        description: "Image source URL.",
      },
      {
        name: "alt",
        type: "string",
        required: false,
        default: '""',
        description: "Accessible alt text for the image.",
      },
      {
        name: "fallback",
        type: "string",
        required: false,
        description:
          "Fallback text (usually initials) displayed when the image fails to load.",
      },
      {
        name: "size",
        type: '"xs" | "sm" | "md" | "lg" | "xl"',
        required: false,
        default: '"md"',
        description: "Size of the avatar.",
      },
      {
        name: "shape",
        type: '"circle" | "square"',
        required: false,
        default: '"circle"',
        description: "Shape of the avatar container.",
      },
    ],
    examples: [
      {
        title: "Avatar with image",
        code: `<Avatar src="/avatars/alice.jpg" alt="Alice Johnson" size="lg" />`,
      },
      {
        title: "Avatar with fallback initials",
        code: `<Avatar fallback="AJ" size="md" shape="circle" />`,
      },
      {
        title: "Square avatar group",
        code: `<div style={{ display: "flex", gap: 4 }}>
  <Avatar src="/avatars/user1.jpg" alt="User 1" size="sm" shape="square" />
  <Avatar src="/avatars/user2.jpg" alt="User 2" size="sm" shape="square" />
  <Avatar fallback="+3" size="sm" shape="square" />
</div>`,
      },
    ],
  },
};
