export interface AuthRepository {
  login(userCredentials: any): Promise<any>;
  me(token: string): Promise<any>;
  register(userRegister: any): Promise<any>;
}
