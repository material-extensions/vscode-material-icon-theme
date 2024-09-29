import { describe, expect, it } from 'bun:test';
import { merge, set } from '../../helpers/object';

describe('set function its', () => {
  it('should set value at root level', () => {
    const obj: { a: number; b: number; c?: number } = { a: 1, b: 2 };
    set(obj, 'c', 3);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('should set value in a nested object', () => {
    const obj: { a: { b: number; c?: number } } = { a: { b: 2 } };
    set(obj, 'a.c', 3);
    expect(obj).toEqual({ a: { b: 2, c: 3 } });
  });

  it('should override existing value', () => {
    const obj = { a: 1 };
    set(obj, 'a', 2);
    expect(obj.a).toBe(2);
  });

  it('should set value with array notation', () => {
    const obj = {};
    set(obj, ['a', 'b', 'c'], 3);
    expect(obj).toEqual({ a: { b: { c: 3 } } });
  });

  it('should create nested structure if not exist', () => {
    const obj = {};
    set(obj, 'a.b.c', 3);
    expect(obj).toEqual({ a: { b: { c: 3 } } });
  });

  it('should set value with complex path', () => {
    const obj: { a: { b: { c: number; d?: { e?: number } } } } = {
      a: { b: { c: 1 } },
    };
    set(obj, 'a.b.d.e', 2);
    expect(obj).toEqual({ a: { b: { c: 1, d: { e: 2 } } } });
  });

  it('should set value to null', () => {
    const obj: { a: number; b?: null } = { a: 1 };
    set(obj, 'b', null);
    expect(obj).toEqual({ a: 1, b: null });
  });

  it('should set value to undefined', () => {
    const obj: { a: number; b?: undefined } = { a: 1 };
    set(obj, 'b', undefined);
    expect(obj).toEqual({ a: 1, b: undefined });
  });
});

describe('merge function its', () => {
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

  it('should merge objects with arrays', () => {
    type Obj = { a: number[]; b?: string; c?: boolean };
    const obj1: Obj = { a: [1, 2], b: 'text' };
    const obj2: Obj = { a: [3, 4], c: true };
    const result = merge(obj1, obj2);
    expect(result).toEqual({ a: [1, 2, 3, 4], b: 'text', c: true });
  });

  it('should handle null and undefined correctly', () => {
    type Obj = {
      a: { x: number } | null;
      b: string | undefined;
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
});
