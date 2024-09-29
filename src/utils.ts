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

export { formattedPrice, standardizePhoneNumber, splitDescription };
