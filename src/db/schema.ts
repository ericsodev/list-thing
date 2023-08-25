import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  serial,
  varchar,
  uuid,
  date,
  primaryKey,
  index,
  unique,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["OWNER", "MEMBER"]);
export const itemStatusEnum = pgEnum("itemStatus", ["ACTIVE", "BACKLOG", "COMPLETE"]);

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 35 }).notNull().unique(),
  encryptedPass: text("encryptedPass").notNull(),
});

export const listUser = pgTable(
  "list_to_user",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    listId: integer("list_id")
      .notNull()
      .references(() => list.id, { onDelete: "cascade" }),
    role: roleEnum("role").notNull().default("MEMBER"),
    joinDate: date("join_date").notNull().defaultNow(),
  },
  (t) => ({ pk: primaryKey(t.userId, t.listId) }),
);

export const list = pgTable("list", {
  id: serial("id").primaryKey(),
  slug: uuid("slug").unique().notNull().defaultRandom(),
  createdOn: date("created_on").notNull().defaultNow(),
  name: varchar("name", { length: 35 }).notNull(),
});

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  listId: integer("list_id")
    .notNull()
    .references(() => list.id, { onDelete: "cascade" }),
  createdOn: date("created_on").notNull().defaultNow(),
  name: varchar("name", { length: 35 }).notNull(),
  adderId: integer("adder_id").references(() => user.id, { onDelete: "set null" }),
  likes: integer("likes").default(0),
  status: itemStatusEnum("status").default("ACTIVE"),
});

export const tag = pgTable(
  "tag",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 35 }).notNull(),
    listId: integer("list_id")
      .notNull()
      .references(() => list.id, { onDelete: "cascade" }),
  },
  (t) => ({
    nameListUnique: unique("name_list_unique").on(t.name, t.listId),
  }),
);

export const tagItem = pgTable(
  "tag_to_item",
  {
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tag.id, { onDelete: "cascade" }),
  },
  (t) => ({ pk: primaryKey(t.tagId, t.itemId) }),
);

export const comment = pgTable(
  "comment",
  {
    id: serial("id").primaryKey(),
    createdOn: date("created_on").defaultNow(),
    userId: integer("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    itemId: integer("item_id")
      .notNull()
      .references(() => item.id, { onDelete: "cascade" }),
    text: varchar("text", { length: 500 }).notNull(),
  },
  (t) => ({
    time_idx: index("time_idx").on(t.itemId, t.createdOn).asc,
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  userToList: many(listUser),
}));

export const listRelations = relations(user, ({ many }) => ({
  userToList: many(listUser),
  items: many(item),
}));

export const userToListRelations = relations(listUser, ({ one }) => ({
  list: one(list, { fields: [listUser.listId], references: [list.id] }),
  user: one(user, { fields: [listUser.userId], references: [user.id] }),
}));

export const itemRelations = relations(item, ({ many, one }) => ({
  tagItem: many(tagItem),
  list: one(list, { fields: [item.listId], references: [list.id] }),
  comments: many(comment),
}));

export const tagRelations = relations(tag, ({ many, one }) => ({
  tagItem: many(tagItem),
  list: one(list, { fields: [tag.listId], references: [list.id] }),
}));

export const tagItemRelations = relations(tagItem, ({ one }) => ({
  item: one(item, { fields: [tagItem.itemId], references: [item.id] }),
  tag: one(tag, { fields: [tagItem.tagId], references: [tag.id] }),
}));

export const commentRelations = relations(comment, ({ many, one }) => ({
  user: one(user, { fields: [comment.userId], references: [user.id] }),
  item: one(item, { fields: [comment.itemId], references: [item.id] }),
}));
