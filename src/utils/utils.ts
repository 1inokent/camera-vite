const formattedPrice = (price: number) => price.toLocaleString('ru-RU');

const standardizePhoneNumber = (phone: string) => {
  const digits = phone.replace(/\D/g, '');

  return `+${digits}`;
};

const splitDescription = (description: string) => {
  const trimmedDescription = description.endsWith('.')
    ? description.slice(0, -1)
    : description;

  const sentences = trimmedDescription.split('. ').filter(Boolean);

  const firstSentence = sentences.length > 0 ? `${sentences[0]}.` : '';
  const remainingDescription =
    sentences.length > 1 ? `${sentences.slice(1).join('. ')}.` : '';

  return { firstSentence, remainingDescription };
};

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
  };

  return date.toLocaleDateString('ru-RU', options);
};

const smoothScrollToTop = () => {
  const SCROLL_DURATION = 300;
  const SCROLL_STEP = 5;

  const totalScrollDistance = window.scrollY;

  const scrollStepAmount =
    -totalScrollDistance / (SCROLL_DURATION / SCROLL_STEP);
  const step = () => {
    if (window.scrollY !== 0) {
      window.scrollBy(0, scrollStepAmount);
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};

const getBannerText = (index: number) => {
  switch (index) {
    case 0:
      return 'Профессиональная камера от известного производителя';
    case 1:
      return 'Для истинных ценителей и коллекционеров';
    case 2:
      return 'Маленькое чудо фотографии';
    default:
      return 'Профессиональная камера от известного производителя';
  }
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/й/g, 'и')
    .replace(/0/g, 'о')
    .replace(/c/g, 'k')
    .replace(/q/g, 'k')
    .replace(/l/g, 'i')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/\s+/g, '')
    .replace(/-/g, '');
}

export {
  formattedPrice,
  standardizePhoneNumber,
  splitDescription,
  formatDate,
  smoothScrollToTop,
  getBannerText,
  normalizeText
};
