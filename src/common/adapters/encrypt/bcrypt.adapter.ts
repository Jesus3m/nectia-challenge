import bcrypt from "bcrypt";
import { EncryptAdapter } from "./encrypt.adapter";
export class BcryptAdapter implements EncryptAdapter {
  /**
   * Hashes the given value using bcrypt.
   * @param value The value to hash.
   * @returns A promise that resolves to the hashed value.
   */
  async hash(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, 10);
    return hash;
  }

  /**
   * Compares the given value with the given hash.
   * @param value The value to compare.
   * @param hash The hash to compare with.
   * @returns A boolean indicating whether the comparison is true or false.
   */
  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
