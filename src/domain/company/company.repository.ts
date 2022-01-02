export class CompanyRepositoryLocal {
  private readonly companies = [
    { cnpj: '11111111111111', password: 'foo' },
    { cnpj: '11111111111112', password: 'bar' },
  ];

  async findOne(cnpj: string) {
    return this.companies.find((c) => c.cnpj == cnpj);
  }
}
