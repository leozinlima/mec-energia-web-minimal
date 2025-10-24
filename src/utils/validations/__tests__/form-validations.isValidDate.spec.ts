import { isValidDate } from '../../validations/form-validations';

describe('isValidDate (MC/DC)', () => {
// CT1 — baseline: D1(A=F,B=F)→F; D2(C=F)→F; D3(D=F)→F  ⇒ resultado: true
  it('CT1: data válida, não futura e após 2010', () => {
    const d = new Date('2012-05-20T12:00:00Z');
    expect(isValidDate(d)).toBe(true);
  });

// CT2 — Indep. de A em D1: (A=T,B=F)→T vs CT1 (A=F,B=F)→F — só A muda; A=!date, B=!isValid(date)
  it('CT2: date = null', () => {
    expect(isValidDate(null as any)).toMatch(/Insira uma data válida/);
  });

// CT3 — Indep. de B em D1: (A=F,B=T)→T vs CT1 (A=F,B=F)→F — só B muda; A=!date, B=!isValid(date)
  it('CT3: Date inválida', () => {
    const invalidDate = new Date('invalid');
    expect(isValidDate(invalidDate as any)).toMatch(/Insira uma data válida/);
  });

// CT4 — Indep. de C em D2: C=T (futuro)→T vs CT1 C=F — demais condições iguais; C=isFuture(dateToCompare)
  it('CT4: data futura', () => {
    const future = new Date();
    future.setDate(future.getDate() + 1);
    expect(isValidDate(future)).toMatch(/futuras não são permitidas/);
  });

// CT5 — Indep. de D em D3: D=T (após piso 2010)→T vs CT1 D=F — demais iguais; D=isAfter(dateToCompare, floor)
  it('CT5: data não após 2010', () => {
    const edge = new Date('2010-01-01T00:00:00Z');
    expect(isValidDate(edge)).toMatch(/antes de 2010 não são permitidas/);
  });
});