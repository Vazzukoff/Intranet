// Load camelcase-keys dynamically
let camelcaseKeys: any;
(async () => {
  const module = await import("camelcase-keys");
  camelcaseKeys = module.default;
})();

// Load decamelize dynamically
let decamelize: any;
(async () => {
  const module = await import("decamelize");
  decamelize = module.default;
})();

export function objectToCamelCase<T extends Record<string, any>>(obj: T): T {
  return camelcaseKeys(obj, { deep: true });
}

export function toSnakeCase(str: string): string {
  return decamelize(str);
}