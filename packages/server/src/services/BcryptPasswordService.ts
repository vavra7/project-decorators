import { compare, hash } from 'bcrypt';
import { Service } from 'typedi';

@Service()
export class BcryptPasswordService {
  public hash(password: string): Promise<string> {
    return hash(password, 12);
  }

  public compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
