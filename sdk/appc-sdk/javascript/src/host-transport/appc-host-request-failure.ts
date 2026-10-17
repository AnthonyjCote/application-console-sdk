export class AppcHostRequestFailure extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "AppcHostRequestFailure";
    this.code = code;
  }
}
