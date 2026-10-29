#!/usr/bin/env -S node
import type {
  Contract as End,
  Contract as Start,
} from '../../snapshots/e61d78e2dffe7b528f3975eb7b0307569006078f04e8c7ec8198ac0a5dcd1554/contract';
import endContract from '../../snapshots/e61d78e2dffe7b528f3975eb7b0307569006078f04e8c7ec8198ac0a5dcd1554/contract.json' with { type: 'json' };
import startContract from '../../snapshots/e61d78e2dffe7b528f3975eb7b0307569006078f04e8c7ec8198ac0a5dcd1554/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-sqlite/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      // Create User table for consultation bookings and project intakes
      this.createTable('User', {
        id: {
          type: 'TEXT',
          default: fn(sql`uuid()`),
          notNull: true,
          codecRef: { codecId: 'sqlite/text@1' },
        },
        createdAt: {
          type: 'TEXT',
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'sqlite/datetime@1' },
        },
        updatedAt: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/datetime@1' },
        },
      }),
      this.createIndex({
        table: 'User',
        fields: ['updatedAt'],
        unique: false,
      }),

      // Create ConsultationBooking table - SOC2 audit trail
      this.createTable('ConsultationBooking', {
        id: {
          type: 'TEXT',
          default: fn(sql`uuid()`),
          notNull: true,
          codecRef: { codecId: 'sqlite/text@1' },
        },
        createdAt: {
          type: 'TEXT',
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'sqlite/datetime@1' },
        },
        fullName: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        email: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        phone: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        companyName: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        businessType: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        primaryPain: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        desiredOutcome: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        budgetRange: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        timeline: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        status: {
          type: 'TEXT',
          notNull: true,
          default: 'pending',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        ipHash: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        userAgent: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
      }),
      this.createIndex({
        table: 'ConsultationBooking',
        fields: ['status'],
        unique: false,
      }),
      this.createIndex({
        table: 'ConsultationBooking',
        fields: ['createdAt'],
        unique: false,
      }),

      // Create ProjectIntake table - detailed project requirements
      this.createTable('ProjectIntake', {
        id: {
          type: 'TEXT',
          default: fn(sql`uuid()`),
          notNull: true,
          codecRef: { codecId: 'sqlite/text@1' },
        },
        createdAt: {
          type: 'TEXT',
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'sqlite/datetime@1' },
        },
        fullName: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        email: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        companyName: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        companyWebsite: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        currentTechStack: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        primaryPainPoints: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        desiredOutcomes: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        budgetRange: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        timeline: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        scopeOfWork: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        status: {
          type: 'TEXT',
          notNull: true,
          default: 'pending',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        ipHash: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        userAgent: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
      }),
      this.createIndex({
        table: 'ProjectIntake',
        fields: ['status'],
        unique: false,
      }),
      this.createIndex({
        table: 'ProjectIntake',
        fields: ['createdAt'],
        unique: false,
      }),

      // Create DashboardMetrics table for future web development dashboard UI
      this.createTable('DashboardMetrics', {
        id: {
          type: 'TEXT',
          default: fn(sql`uuid()`),
          notNull: true,
          codecRef: { codecId: 'sqlite/text@1' },
        },
        createdAt: {
          type: 'TEXT',
          notNull: true,
          default: fn(sql`now()`),
          codecRef: { codecId: 'sqlite/datetime@1' },
        },
        pageViewed: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        consultationId: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        projectIntakeId: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        userId: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
        ipHash: {
          type: 'TEXT',
          codecRef: { codecId: 'sqlite/text@1' },
        },
      }),
      this.createIndex({
        table: 'DashboardMetrics',
        fields: ['createdAt'],
        unique: false,
      }),
      this.createIndex({
        table: 'DashboardMetrics',
        fields: ['pageViewed'],
        unique: false,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);