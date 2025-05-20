export class AppError extends Error {
    constructor(message: string, public status: number, public code: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string, id?: number) {
      const message = id
        ? `${resource} with id ${id} not found`
        : `${resource} not found`;
  
      super(message, 404, `${resource.toUpperCase()}_NOT_FOUND`);
    }
  }