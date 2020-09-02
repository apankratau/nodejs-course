import User from '../models/User';

export const isAvailable = (user: User): boolean => !user.isDeleted;

export const isMissing = (user: User | undefined): boolean => !user || user.isDeleted;

export const getAutoSuggestUsers = (users: Map<string, User>) => (loginSubstring: string, limit: number): User[] =>
  [...users.values()]
    .filter(isAvailable)
    .filter(({ login }) => login.includes(loginSubstring))
    .slice(0, limit)
    .sort(({ login: loginA }, { login: loginB }) => loginA.localeCompare(loginB));
