import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  pgEnum,
  boolean,
  jsonb,
  text,
} from "drizzle-orm/pg-core";

// Enum for update intervals
export const updateIntervalEnum = pgEnum("update_interval", [
  "hourly",
  "daily",
  "weekly",
  "monthly",
]);

// Tracked GitHub users
export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }),
  avatarUrl: varchar("avatar_url", { length: 500 }),
  followers: text("followers").array().default([]),
  lastSynced: timestamp("last_synced").defaultNow(),
  lastEmailSent: timestamp("last_email_sent"),
  knownFollowers: text("known_followers").array().default([]),
});

export type UserStats = typeof userStats.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;

// Email subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => userStats.id, { onDelete: "cascade" }),
  emailFrequency: updateIntervalEnum("email_frequency")
    .notNull()
    .default("daily"),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  lastEmailSent: timestamp("last_email_sent"),
  knownFollowers: text("known_followers").array().default([]),
  isActive: boolean("is_active").default(true),
});
