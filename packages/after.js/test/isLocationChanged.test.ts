import { Location } from 'history';
import { isLocationChanged } from '../src/utils';

const loc = (overrides: Partial<Location> = {}): Location => ({
  pathname: '/a',
  search: '',
  hash: '',
  state: undefined,
  key: 'k1',
  ...overrides,
});

describe('isLocationChanged', () => {
  it('is false for a new object with the same fields', () => {
    expect(isLocationChanged(loc(), loc())).toBe(false);
  });

  it('is true when pathname, search or key differ', () => {
    expect(isLocationChanged(loc(), loc({ pathname: '/b' }))).toBe(true);
    expect(isLocationChanged(loc(), loc({ search: '?q=1' }))).toBe(true);
    expect(isLocationChanged(loc(), loc({ key: 'k2' }))).toBe(true);
  });

  it('ignores hash-only changes with the same key', () => {
    expect(isLocationChanged(loc(), loc({ hash: '#x' }))).toBe(false);
  });

  it('treats null vs a location as changed', () => {
    expect(isLocationChanged(null, loc())).toBe(true);
    expect(isLocationChanged(null, null)).toBe(false);
  });
});
