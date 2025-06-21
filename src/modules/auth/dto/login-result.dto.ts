export class LoginResult {
  constructor(access_token: string) {
    this.access_token = access_token;
  }

  access_token: string;
}
