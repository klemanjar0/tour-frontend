class ErrorService {
  private errors: Record<number, string>;

  constructor() {
    this.errors = [];
  }

  setErrors(errors: Record<number, string>) {
    this.errors = errors;
  }

  getErrorDescription(errorCode: number): string {
    const error = !!this.errors[errorCode];
    if (error) {
      return this.errors[errorCode];
    } else {
      return 'Unknown Error.';
    }
  }
}

export default new ErrorService();
