import { config } from "@common/config";
import jwt from "jsonwebtoken";
import { JsonWebTokenAdapter } from "./json_web_token.adapter";
export class JWTAdapter implements JsonWebTokenAdapter {
  async sign(payload: any): Promise<string> {
    const sign = await jwt.sign(payload, config.JWT.SECRET!, {
      expiresIn: config.JWT.EXPIRES_IN! || "1d",
    });

    return sign;
  }

  async verify(token: string): Promise<any> {
    try {
      const verify = await jwt.verify(token, config.JWT.SECRET!, {
        ignoreExpiration: true,
      });
      return verify;
    } catch (error) {
      throw error;
    }
  }
}
