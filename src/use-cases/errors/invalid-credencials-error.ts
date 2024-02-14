export class InvalidCredencialError extends Error {
  constructor() {
    super('Email/password is not valid!')
  }
}
