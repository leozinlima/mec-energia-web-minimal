import { isAfter, isFuture, isValid } from 'date-fns';

/**
 * Retorna string de erro quando inválido; true quando válido.
 */
export const isValidDate = (date: Date | null) => {
  // CD1: (!date || !isValid(date))
  if (!date || !isValid(date)) {
    return "Insira uma data válida no formato dd/mm/aaaa";
  }

  // Normaliza a hora para consistência
  const dateToCompare = new Date(date.getTime());
  dateToCompare.setHours(0, 1, 0, 0);

  // CD2: isFuture
  if (isFuture(dateToCompare)) {
    return "Datas futuras não são permitidas";
  }

  // CD3: !isAfter(2010)
  const floor = new Date("2010-01-01T00:00:00");
  if (!isAfter(dateToCompare, floor)) {
    return "Datas antes de 2010 não são permitidas";
  }

  return true;
};
