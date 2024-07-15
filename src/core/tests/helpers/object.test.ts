import { describe, expect, test } from 'bun:test';
import { merge, set } from '../../helpers/object';

describe('set function tests', () => {
  test('sets value at root level', () => {
    const obj: { a: number; b: number; c?: number } = { a: 1, b: 2 };
    set(obj, 'c', 3);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('sets value in a nested object', () => {
    const obj: { a: { b: number; c?: number } } = { a: { b: 2 } };
    set(obj, 'a.c', 3);
    expect(obj).toEqual({ a: { b: 2, c: 3 } });
  });

  test('overrides existing value', () => {
    const obj = { a: 1 };
    set(obj, 'a', 2);
    expect(obj.a).toBe(2);
  });

  test('sets value with array notation', () => {
    const obj = {};
    set(obj, ['a', 'b', 'c'], 3);
    expect(obj).toEqual({ a: { b: { c: 3 } } });
  });

  test('creates nested structure if not exist', () => {
    const obj = {};
    set(obj, 'a.b.c', 3);
    expect(obj).toEqual({ a: { b: { c: 3 } } });
  });

  test('sets value with complex path', () => {
    const obj: { a: { b: { c: number; d?: { e?: number } } } } = {
      a: { b: { c: 1 } },
    };
    set(obj, 'a.b.d.e', 2);
    expect(obj).toEqual({ a: { b: { c: 1, d: { e: 2 } } } });
  });

  test('sets value to null', () => {
    const obj: { a: number; b?: null } = { a: 1 };
    set(obj, 'b', null);
    expect(obj).toEqual({ a: 1, b: null });
  });

  test('sets value to undefined', () => {
    const obj: { a: number; b?: undefined } = { a: 1 };
    set(obj, 'b', undefined);
    expect(obj).toEqual({ a: 1, b: undefined });
  });
});

describe('Helper function tests', () => {
  test('merges objects with primitive values', () => {
    const obj1 = { a: 1, b: 'text' };
    const obj2 = { a: 2, c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 2, b: 'text', c: true });
  });

  test('merges objects with nested objects', () => {
    const obj1 = { a: { x: 1 }, b: 'text' };
    const obj2 = { a: { y: 2 }, c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: { x: 1, y: 2 }, b: 'text', c: true });
  });

  test('merges objects with arrays', () => {
    const obj1 = { a: [1, 2], b: 'text' };
    const obj2 = { a: [3, 4], c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: [1, 2, 3, 4], b: 'text', c: true });
  });

  test('handles null and undefined correctly', () => {
    const obj1 = { a: null, b: undefined };
    const obj2 = { a: { x: 1 }, b: 'text' };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: { x: 1 }, b: 'text' });
  });
});
