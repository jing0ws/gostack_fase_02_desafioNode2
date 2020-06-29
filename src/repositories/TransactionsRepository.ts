import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const dbIncome = await this.find({ where: { type: 'income' } });
    const income: number = dbIncome.reduce((acc, val) => {
      return acc + val.value;
    }, 0);

    const dbOutcome = await this.find({ where: { type: 'outcome' } });
    const outcome: number = dbOutcome.reduce((acc, val) => {
      return acc + val.value;
    }, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
