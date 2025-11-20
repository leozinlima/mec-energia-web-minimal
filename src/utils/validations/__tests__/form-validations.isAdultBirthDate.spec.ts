import { isAdultBirthDate } from '../../validations/form-validations';

describe('isAdultBirthDate (TDD)', () => {
  // Data de referência fixa para garantir determinismo nos testes
  const today = new Date('2025-01-01T00:00:00Z');

  it('TDD1: retorna true para pessoa exatamente com 18 anos', () => {
    const birthDate = new Date('2007-01-01T00:00:00Z');
    expect(isAdultBirthDate(birthDate, today)).toBe(true);
  });

  it('TDD2: retorna mensagem para data nula ou inválida', () => {
    expect(isAdultBirthDate(null as any, today))
      .toMatch(/data válida de nascimento/i);

    const invalid = new Date('invalid');
    expect(isAdultBirthDate(invalid as any, today))
      .toMatch(/data válida de nascimento/i);
  });

  it('TDD3: rejeita datas de nascimento futuras', () => {
    const futureBirth = new Date('2026-01-01T00:00:00Z');
    expect(isAdultBirthDate(futureBirth, today))
      .toMatch(/futuras não são permitidas/i);
  });

  it('TDD4: rejeita datas com menos de 18 anos completos', () => {
    const underAge = new Date('2008-01-02T00:00:00Z');
    expect(isAdultBirthDate(underAge, today))
      .toMatch(/pelo menos 18 anos/i);
  });
});
