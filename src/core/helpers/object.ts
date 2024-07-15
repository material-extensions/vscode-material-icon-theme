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

export const merge = <T>(
  // biome-ignore lint/suspicious/noExplicitAny: Multiple unknown types due to recursive function
  ...objects: any[]
): T => {
  return objects.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key]) && Array.isArray(acc[key])) {
        acc[key] = acc[key].concat(obj[key]);
      } else if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        typeof acc[key] === 'object' &&
        acc[key] !== null
      ) {
        acc[key] = merge(acc[key], obj[key]);
      } else {
        acc[key] = obj[key];
      }
    });
    return acc;
  }, {});
};
