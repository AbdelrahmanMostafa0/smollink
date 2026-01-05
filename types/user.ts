export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  profilePicture?: string;
  provider: string;
  googleId?: string;
}
