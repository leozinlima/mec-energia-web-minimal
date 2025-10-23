import { isValidDate } from '../../validations/form-validations';

describe('isValidDate (MC/DC)', () => {
  it('CT1: data válida, não futura e após 2010', () => {
    const d = new Date('2012-05-20T12:00:00Z');
    expect(isValidDate(d)).toBe(true);
  });

  it('CT2: date = null', () => {
    expect(isValidDate(null as any)).toMatch(/Insira uma data válida/);
  });

  it('CT3: Date inválida', () => {
    const invalidDate = new Date('invalid');
    expect(isValidDate(invalidDate as any)).toMatch(/Insira uma data válida/);
  });

  it('CT4: data futura', () => {
    const future = new Date();
    future.setDate(future.getDate() + 1);
    expect(isValidDate(future)).toMatch(/futuras não são permitidas/);
  });

  it('CT5: data não após 2010', () => {
    const edge = new Date('2010-01-01T00:00:00Z');
    expect(isValidDate(edge)).toMatch(/antes de 2010 não são permitidas/);
  });
});
