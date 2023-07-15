/**
 * This monad used for error handling in our application.
 * This class can have one from two possible values types.
 * Left type - for failed calculations.
 * Right type - for successfull calculations.
 * 
 * You can map Left and Right values, using .mapLeft and .mapRight methods
 * 
 * Please, use it for error handling, except of using try...catch blocks
 */
enum EitherType {
  Left = 'Left',
  Right = 'Right'
}

class Either<L, R> {
  constructor(
    private type: EitherType, 
    public readonly value: R | L
  ) {}

  static right<L, T>(value: T): Either<L, T> {
    return new Either<L, T>(EitherType.Right, value);
  }

  static left<T, R>(value: T): Either<T, R> {
    return new Either<T, R>(EitherType.Left, value);
  }

  public isLeft(): boolean {
    return this.type === EitherType.Left;
  }

  static mergeToOne<L1, R1, L2, R2>(either1: Either<L1, R1>, either2: Either<L2, R2>): Either<L1 | L2, [R1, R2]> {
    if (either1.isLeft() || either2.isLeft()) {
      return Either.left(either1.getLeft() || either2.getLeft());
    }
    return Either.right([either1.getRight(), either2.getRight()]);
  }

  static mergeToLast<L1, R1, L2, R2>(either1: Either<L1, R1>, either2: Either<L2, R2>): Either<L1 | L2, R2> {
    if (either1.isLeft() || either2.isLeft()) {
      return Either.left(either1.getLeft() || either2.getLeft());
    }
    return Either.right(either2.getRight());
  }

  public isRight(): boolean {
    return this.type === EitherType.Right;
  }

  public map<T>(f: (right: R) => T): Either<L, T> {
    if (this.isLeft()) {
      return Either.left(this.value as L);
    }
    return Either.right(f(this.value as R));
  }

  public mapRight<T>(f: (right: R) => T): Either<L, T> {
    return this.map(f);
  }

  public mapLeft<T>(f: (left: L) => T): Either<T, R> {
    if (this.isLeft()) {
      return Either.left(f(this.value as L));
    }
    return Either.right(this.value as R);
  }

  public async mapAsync<T>(f: (right: R) => Promise<T>): Promise<Either<L, T>> {
    if (this.isLeft()) {
      return Promise.resolve(Either.left(this.value as L));
    }
    const mappedValue = await f(this.value as R);
    return Either.right(mappedValue);
  }

  public mapRightAsync<T>(f: (right: R) => Promise<T>): Promise<Either<L, T>> {
    return this.mapAsync(f);
  }

  public async mapLeftAsync<T>(f: (left: L) => Promise<T>): Promise<Either<T, R>> {
    if (this.isLeft()) {
      const mappedValue = await f(this.value as L);
      return Either.left(mappedValue);
    }
    return Either.right(this.value as R);
  }

  public getLeft(): L {
    return this.isLeft() ? this.value as L : undefined;
  }

  public getRight(): R {
    return this.isRight() ? this.value as R : undefined;
  }

  public chain<A, B>(f: (right: R) => Either<A, B>): Either<A | L, B> {
    if (this.isLeft()) {
      return Either.left(this.value as L);
    }
    return f(this.value as R);
  }
  
  public join<L1, L2, R>(this: Either<L1, Either<L2, R>>): Either<L1 | L2, R> {
    return this.chain(x => x);
  }

  public check<T>(f: (right: R) => boolean, newLeft: T): Either<T | L, R> {
    if (this.isLeft()) {
      return Either.left(this.value as L);
    }

    return f(this.value as R) ? Either.right(this.value as R) : Either.left(newLeft);
  }

  public async checkAsync<T>(f: (right: R) => Promise<boolean>, newLeft: T): Promise<Either<T | L, R>> {
    if (this.isLeft()) {
      return Either.left(this.value as L);
    }

    const isValid = await f(this.value as R);
    return isValid ? Either.right(this.value as R) : Either.left(newLeft);
  }

  public leftSideEffect(f: (left: L) => void): Either<L, R> {
    if (this.isLeft()) {
      f(this.value as L);
    }
    return this;
  }

  public rightSideEffect(f: (right: R) => void): Either<L, R> {
    if (this.isRight()) {
      f(this.value as R);
    }
    return this;
  }

  public async rightAsyncSideEffect(f: (right: R) => Promise<void>): Promise<Either<L, R>> {
    if (this.isRight()) {
      await f(this.value as R);
    }
    return this;
  }

  public async leftAsyncSideEffect(f: (left: L) => Promise<void>): Promise<Either<L, R>> {
    if (this.isRight()) {
      await f(this.value as L);
    }
    return this;
  }
}

export { Either };
