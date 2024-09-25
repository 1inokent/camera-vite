const formattedPrice = (price: number) => price.toLocaleString('ru-RU');

const standardizePhoneNumber = (phone: string) => {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }
  return `+${digits}`;
};

export { formattedPrice, standardizePhoneNumber };
