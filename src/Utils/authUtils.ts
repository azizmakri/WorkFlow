export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getUserRole = (): string | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).role : null;
};
