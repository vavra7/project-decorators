import { Language } from './enums';

export const port = 4000;

export const baseUrl = `http://localhost:${port}`;

export const defaultLang = Language.Cs;

export const clientUrl = 'http://localhost:3000';

export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET';

export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'REFRESH_TOKEN';
