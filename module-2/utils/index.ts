import User from '../models/User';

export const filterNotDeleted = (user: User): boolean => !user.isDeleted;

export const getAutoSuggestUsers = (users: Map<string, User>) => (
  loginSubstring: string,
  limit: number,
): User[] =>
  [...users.values()]
    .filter(filterNotDeleted)
    .filter(({ login }) => login.includes(loginSubstring))
    .slice(0, limit)
    .sort(({ login: loginA }, { login: loginB }) => loginA.localeCompare(loginB));

