import { User } from "../types/auth";

const TOKEN_KEY = "auth_token";

// Simular usuarios válidos
const VALID_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "password123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Regular User",
    role: "user",
  },
];

// Simular la creación de un JWT
export function createMockJWT(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      exp: Date.now() + 24 * 60 * 60 * 1000, // Expira en 24 horas
      iat: Date.now(),
    }),
  );
  const signature = btoa("mock-signature-" + Date.now());

  return `${header}.${payload}.${signature}`;
}

// Validar credenciales
export function validateCredentials(
  email: string,
  password: string,
): User | null {
  const user = VALID_USERS.find(
    (u) => u.email === email && u.password === password,
  );
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

// Verificar si el token es válido
export function verifyMockJWT(token: string): User | null {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));

    // Verificar si el token ha expirado
    if (Date.now() > payload.exp) {
      return null;
    }

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch (error) {
    return null;
  }
}

// Obtener token del localStorage
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// Guardar token en localStorage
export function storeToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

// Remover token del localStorage
export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}
