import stringify from 'fast-json-stable-stringify';
import md5 from 'md5';

export function getHash(obj: object): string {
  return md5(stringify(obj));
}
