import { describe, it, expect } from 'vitest';
import { queryObjectToString } from './utils';

describe('queryObjectToString', () => {
    it('should convert an empty object to an empty string', () => {
        const result = queryObjectToString({});
        expect(result).toBe('');
    });

    it('should convert a single key-value pair correctly', () => {
        const result = queryObjectToString({ key: 'value' });
        expect(result).toBe('key=value');
    });

    it('should handle multiple key-value pairs and join them with &', () => {
        const result = queryObjectToString({ key1: 'value1', key2: 'value2' });
        expect(result).toBe('key1=value1&key2=value2');
    });

    it('should escape special characters in keys or values', () => {
        const result = queryObjectToString({ 'key with spaces': 'value%with%special$chars' });
        expect(result).toBe('key+with+spaces=value%25with%25special%24chars');
    });
});