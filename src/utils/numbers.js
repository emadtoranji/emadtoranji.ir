const faDigitsArabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const faDigitsPersian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function numberToFarsi(text, language) {
  if (String(language).toUpperCase() === 'FA') {
    let result = String(text);

    for (let i = 0; i <= 9; i++) {
      const regexPersian = new RegExp(i, 'g');
      result = result.replace(regexPersian, faDigitsPersian[i]);

      const regexArabic = new RegExp(i, 'g');
      result = result.replace(regexArabic, faDigitsArabic[i]);
    }

    return result;
  }

  return text;
}

export function numberToEnglish(text) {
  let result = String(text);

  for (let i = 0; i <= 9; i++) {
    const regexArabic = new RegExp(faDigitsArabic[i], 'g');
    result = result.replace(regexArabic, i);

    const regexPersian = new RegExp(faDigitsPersian[i], 'g');
    result = result.replace(regexPersian, i);
  }

  return result;
}
