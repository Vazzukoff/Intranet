import cors from 'cors';
import { config } from '../config/environment';

export const corsMiddleware = cors({
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
});