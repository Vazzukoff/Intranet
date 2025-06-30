const jwt = require('jsonwebtoken');

// Cookie completa que te devuelve el backend
const rawCookie = '__session%3DeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...%3D%3D.vlLLAO%2BF99btD9Bl7xh9fChojp68wUYP21AgPllkqrM%3B%20Max-Age%3D604800%3B%20Path%3D%2F%3B%20HttpOnly%3B%20SameSite%3DLax';

// 1. Decodificar la cookie URL
const decodedCookie = decodeURIComponent(rawCookie);

// 2. Extraer el token entre '__session=' y el punto y coma ';'
const match = decodedCookie.match(/__session=([^;]+)/);
if (!match) {
  console.error('No se pudo encontrar el token en la cookie');
  process.exit(1);
}

// 3. Decodificar URL *dentro del token*
const rawToken = decodeURIComponent(match[1]);

console.log('Token JWT limpio:', rawToken);

// 4. Decodificar sin verificar la firma
const payload = jwt.decode(rawToken);

console.log('Payload decodificado:', payload);