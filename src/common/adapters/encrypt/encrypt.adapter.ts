export interface EncryptAdapter {
  hash(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
