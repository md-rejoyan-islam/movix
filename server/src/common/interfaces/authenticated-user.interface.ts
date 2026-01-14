export interface IAuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
}

export interface IRequestWithUser extends Request {
  user: IAuthenticatedUser;
}
