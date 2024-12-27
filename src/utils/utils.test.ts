import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  splitDescription,
  formatDate,
  getBannerText,
} from './utils';

describe('Utility Functions', () => {
  describe('formattedPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(1000)).toBe('1 000');
      expect(formatPrice(1234567.89)).toBe('1 234 567,89');
    });
  });

  describe('splitDescription', () => {
    it('should split description correctly', () => {
      expect(splitDescription('Это первое предложение. Это второе.')).toEqual({
        firstSentence: 'Это первое предложение.',
        remainingDescription: 'Это второе.',
      });
      expect(splitDescription('Одно предложение.')).toEqual({
        firstSentence: 'Одно предложение.',
        remainingDescription: '',
      });
      expect(splitDescription('')).toEqual({
        firstSentence: '',
        remainingDescription: '',
      });
      expect(splitDescription('Тест.')).toEqual({
        firstSentence: 'Тест.',
        remainingDescription: '',
      });
      expect(splitDescription('Это первое. Это второе. Это третье.')).toEqual({
        firstSentence: 'Это первое.',
        remainingDescription: 'Это второе. Это третье.',
      });
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      expect(formatDate('2024-10-19')).toBe('19 октября');
      expect(formatDate('2021-01-01')).toBe('01 января');
      expect(formatDate('invalid-date')).toBe('Invalid Date');
    });
  });

  describe('getBannerText', () => {
    it('should return correct banner text based on index', () => {
      expect(getBannerText(0)).toBe(
        'Профессиональная камера от известного производителя'
      );
      expect(getBannerText(1)).toBe('Для истинных ценителей и коллекционеров');
      expect(getBannerText(2)).toBe('Маленькое чудо фотографии');
      expect(getBannerText(3)).toBe(
        'Профессиональная камера от известного производителя'
      );
    });
  });
});
