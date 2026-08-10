import type { Model } from 'objection';

type ObjectionQueryBuilder<
  M extends Model,
  R,
> = import('objection').QueryBuilder<M, R>;

declare module 'objection' {
  interface QueryBuilder<
    M extends import('objection').Model = import('objection').Model,
  > {
    softDelete(): ObjectionQueryBuilder<M, number>;
    restore(): ObjectionQueryBuilder<M, number>;
  }
}

export type SoftDeleteQueryBuilder<M extends Model> = ObjectionQueryBuilder<
  M,
  M[]
> & {
  softDelete(): ObjectionQueryBuilder<M, number>;
  restore(): ObjectionQueryBuilder<M, number>;
};

type SoftDeleteModelClass<M extends Model> = typeof Model & {
  query(...args: any[]): SoftDeleteQueryBuilder<M>;
  queryWithDeleted(...args: any[]): SoftDeleteQueryBuilder<M>;
};

export function softDeleteModel<M extends Model>(
  model: typeof Model,
): SoftDeleteModelClass<M> {
  return model as SoftDeleteModelClass<M>;
}
