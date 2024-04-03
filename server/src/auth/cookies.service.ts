import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookiesService {
  static tokenKey = 'access-token';

  setToken(res: Response, token: string) {
    res.cookie(CookiesService.tokenKey, token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  removeToken(res: Response) {
      res.clearCookie(CookiesService.tokenKey);
  }
}
