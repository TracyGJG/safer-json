/**
 * @jest-environment node
 */

import { jest } from '@jest/globals';

import { parseJson, stringifyJson } from './index.js';

describe('Safer-JSON', () => {
  describe('parseJson', () => {
    it('will return a data property containing a JSON string from a valid object', () => {
      expect(parseJson('{"message":"Hello, World!"}')).toEqual({
        data: { message: 'Hello, World!' },
      });
    });

    it('will return an error property reporting the issue with an invalid JSON string', () => {
      const { error } = parseJson(`{ "bigint": 42n }`);
      expect(error).toBeDefined();
      expect(error).toEqual(
        `Expected ',' or '}' after property value in JSON at position 14 (line 1 column 15)`
      );
    });
  });

  describe('stringifyJson', () => {
    it('will return a data property containing a valid object as a JSON string', () => {
      expect(stringifyJson({ message: 'Hello, World!' })).toEqual({
        data: '{"message":"Hello, World!"}',
      });
    });

    it('will return an error property reporting the issue with an invalid object (circular structure)', () => {
      const obj1 = {};
      const obj2 = { obj1 };
      obj1.obj2 = obj2;

      const { error } = stringifyJson(obj2);
      expect(error).toBeDefined();
      expect(error).toEqual(`Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'obj1' -> object with constructor 'Object'
    --- property 'obj2' closes the circle`);
    });

    it('will return an error property reporting the issue with an invalid object (BigInt)', () => {
      const { error } = stringifyJson({ bigint: 42n });
      expect(error).toBeDefined();
      expect(error).toEqual(`Do not know how to serialize a BigInt`);
    });
  });
});
