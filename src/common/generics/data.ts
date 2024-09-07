export class Data {
  constructor(private data: Record<string, any>, message?: string, code = 200) {
    Object.assign(this, { data, code, message });
  }
}
