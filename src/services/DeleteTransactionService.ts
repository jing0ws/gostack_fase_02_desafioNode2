import { getRepository, DeleteResult } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<DeleteResult> {
    const transationRepostory = getRepository(Transaction);

    const transaction = transationRepostory.findOne({ where: { id } });
    if (!transaction) {
      throw new AppError('This transaction does not exist');
    }

    return transationRepostory.delete({ id });
  }
}

export default DeleteTransactionService;
