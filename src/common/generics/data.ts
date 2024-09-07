export class Data {
  constructor(
    private data: Record<string, any>,
    message?: string,
    code = 200,
    metadata?: any
  ) {
    Object.assign(this, { data, code, message, metadata });
  }
}
