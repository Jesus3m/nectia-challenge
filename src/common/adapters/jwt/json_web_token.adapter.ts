export interface JsonWebTokenAdapter {
  sign(payload: any): Promise<string>;
  verify(token: string): Promise<any>;
}
