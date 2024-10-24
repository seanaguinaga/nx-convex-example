import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  messages: defineTable({
    userId: v.id('users'),
    body: v.string(),
    threadId: v.id('threads'),
  }),
  users: defineTable({
    name: v.string(),
    fingerprint: v.string(),
    isAdmin: v.boolean(),
  }),
  threads: defineTable({
    startedBy: v.id('users'),
  }),
});
