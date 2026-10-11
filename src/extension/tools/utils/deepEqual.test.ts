import { describe, expect, it } from 'vitest';
import { deepEqual } from './deepEqual';

describe('deepEqual', () => {
  it('should return true for identical primitive values', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('abc', 'abc')).toBe(true);
    expect(deepEqual(true, true)).toBe(true);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
  });

  it('should return false for different primitive values', () => {
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('abc', 'def')).toBe(false);
    expect(deepEqual(true, false)).toBe(false);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('should return true for identical objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 2 } };
    expect(deepEqual(obj1, obj2)).toBe(true);
  });

  it('should return false for different objects', () => {
    const obj1 = { a: 1, b: { c: 2 } };
    const obj2 = { a: 1, b: { c: 3 } };
    expect(deepEqual(obj1, obj2)).toBe(false);
  });

  it('should return true for identical arrays', () => {
    const arr1 = [1, [2, 3], { a: 1 }];
    const arr2 = [1, [2, 3], { a: 1 }];
    expect(deepEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for different arrays', () => {
    const arr1 = [1, [2, 3], { a: 1 }];
    const arr2 = [1, [2, 4], { a: 1 }];
    expect(deepEqual(arr1, arr2)).toBe(false);
  });

  it('should handle Dates correctly', () => {
    const date1 = new Date(2023, 0, 1);
    const date2 = new Date(2023, 0, 1);
    const date3 = new Date(2024, 0, 1);
    expect(deepEqual(date1, date2)).toBe(true);
    expect(deepEqual(date1, date3)).toBe(false);
  });

  it('should handle RegExps correctly', () => {
    const reg1 = /abc/g;
    const reg2 = /abc/g;
    const reg3 = /abc/i;
    expect(deepEqual(reg1, reg2)).toBe(true);
    expect(deepEqual(reg1, reg3)).toBe(false);
  });

  it('should handle mixed types', () => {
    expect(deepEqual([], {})).toBe(false);
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual(undefined, null)).toBe(false);
  });
});
