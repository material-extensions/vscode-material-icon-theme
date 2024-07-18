/**
 * Get the nested properties of an object.
 * This solution is lighter than the lodash get-version.
 * Source: http://stackoverflow.com/a/6491621/6942210
 */
export const get = <T>(obj: Object, path: string): T | undefined => {
  const pathArray = path
    .replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    .replace(/^\./, '') // strip a leading dot
    .split('.'); // separate paths in array

  /** Avoid errors in the getValue function. */
  const isObject = (object: unknown) => {
    return object === Object(object);
  };
  let result = structuredClone(obj);

  for (let i = 0; i < pathArray.length; ++i) {
    const k = pathArray[i];
    if (isObject(result) && k in result) {
      result = (result as Record<string, T>)[k] as Object;
    } else {
      return;
    }
  }
  return result as T;
};

/**
 * Set a value for a nested object property.
 * @param obj Object
 * @param path Properties as string e.g. `'a.b.c'`
 * @param value Value to be set for the given property
 * Source: https://stackoverflow.com/a/13719799/6942210
 */
export const set = (
  // biome-ignore lint/suspicious/noExplicitAny: Multiple unknown types due to recursive function
  obj: { [key: string]: any },
  path: string | string[],
  value: unknown
) => {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  if (path.length > 1) {
    const e = path.shift() ?? '';
    set(
      (obj[e] =
        Object.prototype.toString.call(obj[e]) === '[object Object]'
          ? obj[e]
          : {}),
      path,
      value
    );
  } else {
    obj[path[0]] = value;
  }
};

/**
 * Merges given objects recursively.
 *
 * @param objects Provide the objects that should be merged.
 * @returns A new object that is the result of the merge.
 */
export const merge = <T extends Record<string, unknown>>(
  ...objects: (T | undefined | null)[]
): T => {
  return objects.reduce<T>((acc, obj) => {
    Object.keys(obj ?? {}).forEach((key) => {
      const accValue = (acc as Record<string, unknown>)[key];
      const objValue = obj?.[key];

      // Check if one of the values is null or undefined and the other is not
      if (
        (accValue === undefined || accValue === null) &&
        objValue !== undefined &&
        objValue !== null
      ) {
        (acc as Record<string, unknown>)[key] = objValue;
      } else if (
        (objValue === undefined || objValue === null) &&
        accValue !== undefined &&
        accValue !== null
      ) {
        // No need to assign acc[key] to itself
      } else if (Array.isArray(objValue) && Array.isArray(accValue)) {
        (acc as Record<string, unknown>)[key] = [
          ...new Set(accValue.concat(objValue)),
        ];
      } else if (
        typeof objValue === 'object' &&
        objValue !== null &&
        typeof accValue === 'object' &&
        accValue !== null
      ) {
        (acc as Record<string, unknown>)[key] = merge(
          accValue as Record<string, object>,
          objValue as Record<string, object>
        );
      } else {
        (acc as Record<string, unknown>)[key] = objValue;
      }
    });
    return acc;
  }, {} as T);
};
