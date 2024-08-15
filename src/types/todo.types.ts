export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface ITodo {
    userId: string;
    title: string;
    content: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
  }