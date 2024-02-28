export interface User {
  id: Branded<string, 'UserId'>;
  name: string;
  email: string;
}
