import { describe, it, expect } from 'vitest';
import { gestoraSchema } from '../src/validation/schemas';

describe('gestoraSchema', () => {
  it('should validate required fields', () => {
    const data = {
      id: '1',
      nome: '',
      aumHistorico: [],
      produtosInteresse: { cra: false, cri: false, debentures: false, fidc: false, outros: [] },
      tags: [],
      createdAt: '',
      updatedAt: '',
    } as any;
    const result = gestoraSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});