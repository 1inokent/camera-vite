const formattedPrice = (price: number) => price.toLocaleString('ru-RU');

const standardizePhoneNumber = (phone: string) => {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }
  return `+${digits}`;
};

const splitDescription = (description: string) => {
  const sentences = description.split('. ').filter(Boolean);
  const firstSentence =
    sentences.slice(0, 1).join('.') + (sentences.length > 1 ? '.' : '');
  const remainingDescription =
    sentences.slice(1).join('. ') + (sentences.length > 1 ? '.' : '');

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

export {
  formattedPrice,
  standardizePhoneNumber,
  splitDescription,
  formatDate,
  smoothScrollToTop,
};
