import { describe, it, expect } from 'vitest';
import { useFormatDate } from '../useFormatDate';

describe('useFormatDate', () => {
  const { formatDate } = useFormatDate();

  it('Formats date correctly', () => {
    const date = new Date(2026, 8, 15);
    expect(formatDate(date)).toBe('15/9/2026');
  });

  it('Returns empty string if date is false', () => {
    expect(formatDate(null)).toBe('');
    expect(formatDate(undefined)).toBe('');
  });
});