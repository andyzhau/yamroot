import * as mongoose from 'mongoose';

export type IDBRef<T> = mongoose.Types.ObjectId | T;

export type IDBRefArray<T> = mongoose.Types.ObjectId[] | T[];

export function isObjectId<T>(x: IDBRef<T>): x is mongoose.Types.ObjectId {
  return x instanceof mongoose.Types.ObjectId;
}
