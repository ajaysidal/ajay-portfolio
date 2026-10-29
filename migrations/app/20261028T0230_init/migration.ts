#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e61d78e2dffe7b528f3975eb7b0307569006078f04e8c7ec8198ac0a5dcd1554/contract';
import endContract from '../../snapshots/e61d78e2dffe7b528f3975eb7b0307569006078f04e8c7ec8198ac0a5dcd1554/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-sqlite/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        table: 'minimal',
        columns: [
          col('createdAt', 'TEXT', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'sqlite/datetime@1' },
          }),
          col('id', 'TEXT', { notNull: true, codecRef: { codecId: 'sqlite/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
