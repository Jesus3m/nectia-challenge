import { BaseError } from "@common/errors";
import { validate as validateDTO } from "class-validator";

export class DTO {
  constructor(data: any) {
    Object.assign(this, data);
  }

  validate() {}
}

export function Dto(dto?: any) {
  return function <T extends { new (...args: any[]): object }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const [properties] = args;
        if (properties && typeof properties === "object") {
          Object.assign(this, properties);
        }
      }

      async validate() {
        const data = await validateDTO(this);
        if (data.length > 0) {
          throw new BaseError("payload_failed", 400, data);
        }
      }
    };
  };
}
