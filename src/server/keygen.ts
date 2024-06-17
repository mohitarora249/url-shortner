import { randomBytes } from 'crypto';

export const generateKey = () => randomBytes(32);
