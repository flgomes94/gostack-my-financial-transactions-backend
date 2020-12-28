import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const isTypeCorrect = type === 'income' || type === 'outcome';
    if (!isTypeCorrect) {
      throw Error('Operation not permited');
    }
    if (
      this.transactionsRepository.getBalance().total < value &&
      type === 'outcome'
    ) {
      throw Error('Operation not permited');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
