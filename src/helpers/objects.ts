/**
 * Get the nested properties of an object.
 * This solution is lighter than the lodash get-version.
 * Source: http://stackoverflow.com/a/6491621/6942210
 */
export const getObjectPropertyValue = (obj: Object, path: string) => {
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
export const setObjectPropertyValue = (
  obj: { [key: string]: any },
  path: string | string[],
  value: any
) => {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  if (path.length > 1) {
    const e = path.shift() ?? '';
    setObjectPropertyValue(
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
