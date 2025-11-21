// src/utils/maps/safeString.ts

/**
 * Safely converts unknown values to strings for React rendering
 */
export function safeString(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

/**
 * Safely gets a string value from an object
 */
export function safeGetString(obj: Record<string, unknown>, key: string): string {
  return safeString(obj[key]);
}

/**
 * Safely checks if a value exists and is truthy
 */
export function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined && value !== '';
}
