const faDigitsArabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const faDigitsPersian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function numberToFarsi(text: string | number, language?: string): string {
  if (String(language).toUpperCase() === 'FA') {
    let result = String(text);

    for (let i = 0; i <= 9; i++) {
      const regexPersian = new RegExp(String(i), 'g');
      result = result.replace(regexPersian, faDigitsPersian[i]);

      const regexArabic = new RegExp(String(i), 'g');
      result = result.replace(regexArabic, faDigitsArabic[i]);
    }

    return result;
  }

  return String(text);
}

export function numberToEnglish(text: string | number): string {
  let result = String(text);

  for (let i = 0; i <= 9; i++) {
    const regexArabic = new RegExp(faDigitsArabic[i], 'g');
    result = result.replace(regexArabic, String(i));

    const regexPersian = new RegExp(faDigitsPersian[i], 'g');
    result = result.replace(regexPersian, String(i));
  }

  return result;
}
