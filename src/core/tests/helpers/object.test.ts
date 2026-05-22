import { describe, expect, it } from 'bun:test';
import { get, merge, set } from '../../helpers/object';

describe('get', () => {
  it('should get a value at the root level', () => {
    const obj = { a: 1, b: 'hello' };
    expect(get<number>(obj, 'a')).toBe(1);
    expect(get<string>(obj, 'b')).toBe('hello');
  });

  it('should get a nested value', () => {
    const obj = { a: { b: { c: 42 } } };
    expect(get<number>(obj, 'a.b.c')).toBe(42);
  });

  it('should return undefined for a non-existent path', () => {
    const obj = { a: { b: 1 } };
    expect(get<number>(obj, 'a.c')).toBeUndefined();
  });

  it('should return undefined for a deeply non-existent path', () => {
    const obj = { a: 1 };
    expect(get<number>(obj, 'a.b.c.d')).toBeUndefined();
  });

  it('should return undefined for an empty path', () => {
    const obj = { a: 1, b: 2 };
    expect(get<number>(obj, '')).toBeUndefined();
  });

  it('should handle array bracket notation', () => {
    const obj = { a: [{ b: 'x' }, { b: 'y' }] };
    expect(get<string>(obj, 'a[0].b')).toBe('x');
    expect(get<string>(obj, 'a[1].b')).toBe('y');
  });

  it('should return undefined when traversing into a primitive', () => {
    const obj = { a: { b: 1 } };
    expect(get<number>(obj, 'a.b.c')).toBeUndefined();
  });
});

describe('set', () => {
  it('should set a value at root level', () => {
    const obj: Record<string, unknown> = { a: 1, b: 2 };
    set(obj, 'c', 3);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should set a value in an existing nested object', () => {
    const obj: Record<string, unknown> = { a: { b: 2 } };
    set(obj, 'a.c', 3);
    expect(obj).toEqual({ a: { b: 2, c: 3 } });
  });

  it('should override an existing value', () => {
    const obj = { a: 1 };
    set(obj, 'a', 2);
    expect(obj.a).toBe(2);
  });

  it('should set a value with array notation', () => {
    const obj: Record<string, unknown> = {};
    set(obj, ['a', 'b', 'c'], 3);
    expect(obj).toEqual({ a: { b: { c: 3 } } });
  });

  it('should create a nested structure if it does not exist', () => {
    const obj: Record<string, unknown> = {};
    set(obj, 'a.b.c', 3);
    expect(obj).toEqual({ a: { b: { c: 3 } } });
  });

  it('should set a deeply nested value by replacing intermediates', () => {
    const obj: Record<string, unknown> = { a: { b: { c: 1 } } };
    set(obj, 'a.b.d.e', 2);
    expect(obj).toEqual({ a: { b: { c: 1, d: { e: 2 } } } });
  });

  it('should set a value to null', () => {
    const obj: Record<string, unknown> = { a: 1, b: null };
    set(obj, 'b', null);
    expect(obj).toEqual({ a: 1, b: null });
  });

  it('should set a value to undefined', () => {
    const obj: Record<string, unknown> = { a: 1, b: undefined };
    set(obj, 'b', undefined);
    expect(obj).toEqual({ a: 1, b: undefined });
  });

  it('should replace an existing nested object when setting a primitive', () => {
    const obj: Record<string, unknown> = { a: { b: 1 } };
    set(obj, 'a', 2);
    expect(obj).toEqual({ a: 2 });
  });
});

describe('merge', () => {
  it('should merge objects with primitive values', () => {
    type Obj = { a: number; b?: string; c?: boolean };
    const obj1: Obj = { a: 1, b: 'text' };
    const obj2: Obj = { a: 2, c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 2, b: 'text', c: true });
  });

  it('should merge objects with nested objects', () => {
    type Obj = { a: { x?: number; y?: number }; b?: string; c?: boolean };
    const obj1: Obj = { a: { x: 1 }, b: 'text' };
    const obj2: Obj = { a: { y: 2 }, c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: { x: 1, y: 2 }, b: 'text', c: true });
  });

  it('should merge objects with arrays by concatenating and deduplicating', () => {
    type Obj = { a: number[]; b?: string; c?: boolean };
    const obj1: Obj = { a: [1, 2], b: 'text' };
    const obj2: Obj = { a: [3, 4], c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: [1, 2, 3, 4], b: 'text', c: true });
  });

  it('should merge arrays with duplicates', () => {
    type Obj = { items: number[] };
    const obj1: Obj = { items: [1, 2, 3] };
    const obj2: Obj = { items: [2, 3, 4] };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ items: [1, 2, 3, 4] });
  });

  it('should handle null and undefined correctly', () => {
    type Obj = {
      a: { x: number } | null;
      b?: string;
    };
    const obj1: Obj = { a: null, b: undefined };
    const obj2: Obj = { a: { x: 1 }, b: 'text' };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: { x: 1 }, b: 'text' });
  });

  it('should prefer the truthy value when one value is undefined or null and the other is truthy', () => {
    type Obj = {
      key1?: string | null;
      key2?: string | null;
      key3?: string | null;
    };
    const obj1: Obj = { key1: null, key2: 'value2', key3: undefined };
    const obj2: Obj = { key1: 'value1', key2: null, key3: 'value3' };

    const expectedResult = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const result = merge(obj1, obj2);

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty object when called with no arguments', () => {
    const result = merge();
    expect(result).toEqual({});
  });

  it('should handle undefined and null arguments', () => {
    type Obj = { a: number };
    const result = merge(undefined, null, { a: 1 } as Obj);
    expect(result).toEqual({ a: 1 });
  });

  it('should replace a nested object with a primitive when types conflict', () => {
    type Obj = { a: number | { x: number } };
    const obj1: Obj = { a: { x: 1 } };
    const obj2: Obj = { a: 42 };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: 42 });
  });
});
