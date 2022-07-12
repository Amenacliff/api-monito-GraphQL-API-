import { decode, JwtPayload, sign, verify } from "jsonwebtoken";
export class JwtUtils {
  signJWTToken(jsonData: object, duration: string, signingKey: string): string {
    const signedToken = sign(jsonData, signingKey, {
      expiresIn: duration,
    });
    return signedToken;
  }

  parseJwt<T>(jwtString: string): T {
    try {
      const data = decode(jwtString);
      return data as T;
    } catch (error) {
      return null;
    }
  }

  verifyJwtToken(jwtString: string, signingSecret: string): boolean {
    try {
      verify(jwtString, signingSecret);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
