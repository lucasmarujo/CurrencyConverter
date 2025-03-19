export interface Currency {
  code: string;
  name: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'BRL', name: 'CURRENCIES.BRL' },
  { code: 'USD', name: 'CURRENCIES.USD' },
  { code: 'CAD', name: 'CURRENCIES.CAD' },
  { code: 'EUR', name: 'CURRENCIES.EUR' },
  { code: 'GBP', name: 'CURRENCIES.GBP' },
  { code: 'CNY', name: 'CURRENCIES.CNY' },
  { code: 'JPY', name: 'CURRENCIES.JPY' }
];