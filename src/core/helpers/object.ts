/**
 * Get the nested properties of an object.
 * This solution is lighter than the lodash get-version.
 * Source: http://stackoverflow.com/a/6491621/6942210
 */
export const get = (obj: Object, path: string) => {
  const pathArray = path
    .replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    .replace(/^\./, '') // strip a leading dot
    .split('.'); // separate paths in array

  /** Avoid errors in the getValue function. */
  const isObject = (object: unknown) => {
    return object === Object(object);
  };
  let result = JSON.parse(JSON.stringify(obj));

  for (let i = 0; i < pathArray.length; ++i) {
    const k = pathArray[i];
    if (isObject(result) && k in result) {
      result = result[k];
    } else {
      return;
    }
  }
  return result;
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
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const merge = <T>(...objects: any[]): T => {
  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      const accValue = acc[key];
      const objValue = obj[key];

      // Check if one of the values is null or undefined and the other has a truthy value
      if ((accValue === undefined || accValue === null) && objValue) {
        acc[key] = objValue;
      } else if ((objValue === undefined || objValue === null) && accValue) {
        // No need to assign acc[key] to itself
      } else if (Array.isArray(objValue) && Array.isArray(accValue)) {
        acc[key] = accValue.concat(objValue);
      } else if (
        typeof objValue === 'object' &&
        objValue !== null &&
        typeof accValue === 'object' &&
        accValue !== null
      ) {
        acc[key] = merge(accValue, objValue);
      } else {
        acc[key] = objValue;
      }
    });
    return acc;
  }, {});
};
