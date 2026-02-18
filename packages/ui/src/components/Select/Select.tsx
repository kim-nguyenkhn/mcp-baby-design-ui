import React, { useState, useRef, useEffect, useId, useCallback, useMemo } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown, Check, X, Search } from "../Icons";
import {
  selectTriggerVariants,
  selectDropdownVariants,
  selectOptionVariants,
  selectLabelVariants,
  selectTagVariants,
} from "./select.variants";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  /** Available options */
  options: SelectOption[];
  /** Selected value (single select) or values (multi select) */
  value?: string | string[];
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Enable search/filter */
  searchable?: boolean;
  /** Enable multi-select */
  multiple?: boolean;
  /** Error message */
  error?: string;
  /** Label text */
  label?: string;
  /** Additional class names */
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select...",
      disabled = false,
      searchable = false,
      multiple = false,
      error,
      label,
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const listboxId = `${generatedId}-listbox`;

    const hasError = Boolean(error);

    // Normalize value to array for internal use
    const selectedValues: string[] = useMemo(
      () =>
        multiple
          ? (Array.isArray(value) ? value : value ? [value] : [])
          : value
            ? [String(value)]
            : [],
      [multiple, value],
    );

    // Keep a ref to the latest selectedValues to avoid stale closures
    const selectedValuesRef = useRef(selectedValues);
    selectedValuesRef.current = selectedValues;

    const filteredOptions = searchQuery
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : options;

    const handleToggle = () => {
      if (disabled) return;
      setIsOpen((prev) => {
        if (!prev) {
          setSearchQuery("");
          setActiveIndex(-1);
        }
        return !prev;
      });
    };

    const handleSelect = useCallback(
      (optionValue: string) => {
        if (multiple) {
          const current = selectedValuesRef.current;
          const newValues = current.includes(optionValue)
            ? current.filter((v) => v !== optionValue)
            : [...current, optionValue];
          onChange?.(newValues);
        } else {
          onChange?.(optionValue);
          setIsOpen(false);
        }
        setSearchQuery("");
      },
      [multiple, onChange],
    );

    const handleRemoveTag = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      const newValues = selectedValues.filter((v) => v !== optionValue);
      onChange?.(newValues);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
            handleSelect(filteredOptions[activeIndex].value);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setActiveIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0,
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1,
          );
          break;
        case "Escape":
          setIsOpen(false);
          break;
      }
    };

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const getDisplayText = () => {
      if (multiple && selectedValues.length > 0) {
        return null; // Tags shown instead
      }
      if (!multiple && selectedValues.length === 1) {
        const found = options.find((o) => o.value === selectedValues[0]);
        return found?.label ?? placeholder;
      }
      return placeholder;
    };

    const activeDescendantId =
      activeIndex >= 0
        ? `${generatedId}-option-${activeIndex}`
        : undefined;

    const role = searchable ? "combobox" : "listbox";

    return (
      <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)}>
        {label && (
          <label className={cn(selectLabelVariants())}>{label}</label>
        )}
        <div ref={containerRef} className="relative">
          <div
            role={role}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-activedescendant={activeDescendantId}
            aria-disabled={disabled || undefined}
            aria-invalid={hasError || undefined}
            tabIndex={disabled ? -1 : 0}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={cn(
              selectTriggerVariants({ hasError, isOpen }),
              "min-h-[40px]",
            )}
            data-testid="select-trigger"
          >
            <div className="flex flex-1 flex-wrap items-center gap-1 overflow-hidden">
              {multiple &&
                selectedValues.map((v) => {
                  const opt = options.find((o) => o.value === v);
                  return (
                    <span key={v} className={cn(selectTagVariants())}>
                      {opt?.label}
                      <button
                        type="button"
                        onClick={(e) => handleRemoveTag(v, e)}
                        className="hover:text-primary-900"
                        aria-label={`Remove ${opt?.label}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
              {getDisplayText() && (
                <span
                  className={cn(
                    selectedValues.length === 0
                      ? "text-neutral-400"
                      : "text-neutral-800",
                  )}
                >
                  {getDisplayText()}
                </span>
              )}
            </div>
            <ChevronDown
              size={16}
              className={cn(
                "shrink-0 text-neutral-400 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </div>

          {isOpen && (
            <div
              className={cn(selectDropdownVariants())}
              role="listbox"
              id={listboxId}
              data-testid="select-dropdown"
            >
              {searchable && (
                <div className="flex items-center gap-2 border-b border-neutral-200 px-3 py-2">
                  <Search size={14} className="text-neutral-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full text-sm outline-none placeholder:text-neutral-400"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveIndex(-1);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    data-testid="select-search"
                    aria-label="Search options"
                  />
                </div>
              )}
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-neutral-500">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option, index) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      id={`${generatedId}-option-${index}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        selectOptionVariants({
                          isActive: isSelected || index === activeIndex,
                        }),
                      )}
                      data-testid={`select-option-${option.value}`}
                    >
                      {multiple && (
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border",
                            isSelected
                              ? "bg-primary-500 border-primary-500 text-white"
                              : "border-neutral-300",
                          )}
                        >
                          {isSelected && <Check size={10} />}
                        </span>
                      )}
                      <span>{option.label}</span>
                      {!multiple && isSelected && (
                        <Check size={14} className="ml-auto text-primary-500" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
        {error && (
          <span className="text-xs text-error-500">{error}</span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
