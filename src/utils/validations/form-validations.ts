import { isAfter, isFuture, isValid, subYears } from 'date-fns';

/**
 * Retorna string de erro quando inválido; true quando válido.
 * Função já existente no projeto, utilizada na Atividade 3 (MC/DC).
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

/**
 * Nova funcionalidade desenvolvida na Atividade 4:
 * Validação de data de nascimento com idade mínima de 18 anos.
 *
 * Retorna string de erro quando inválido; true quando válido.
 *
 * @param birthDate Data de nascimento a ser validada.
 * @param today Data de referência (por padrão, data atual). Nos testes é injetada
 *              uma data fixa para tornar os cenários determinísticos.
 */
export const isAdultBirthDate = (birthDate: Date | null, today: Date = new Date()) => {
  // Entrada nula ou inválida
  if (!birthDate || !isValid(birthDate)) {
    return 'Insira uma data válida de nascimento no formato dd/mm/aaaa';
  }

  // Função local para normalizar datas (refatoração interna da função)
  const normalize = (d: Date): Date => {
    const copy = new Date(d.getTime());
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  const birth = normalize(birthDate);
  const reference = normalize(today);

  // Datas de nascimento futuras em relação à data de referência não são permitidas
  if (isAfter(birth, reference)) {
    return 'Datas de nascimento futuras não são permitidas';
  }

  // Data mínima: hoje - 18 anos
  const eighteenYearsAgo = subYears(reference, 18);

  // Se a data de nascimento for depois da data limite, a pessoa ainda não tem 18 anos
  if (isAfter(birth, eighteenYearsAgo)) {
    return 'É necessário ter pelo menos 18 anos';
  }

  return true;
};
