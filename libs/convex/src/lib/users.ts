import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: {
    fingerprint: v.string(),
    name: v.string(),
  },
  handler: async (ctx, { fingerprint, name }) => {
    const isAdmin = fingerprint.startsWith('admin');
    const userId = await ctx.db.insert('users', {
      fingerprint,
      name,
      isAdmin,
    });

    // start an initial thread if they're not an admin user
    if (!isAdmin) {
      await ctx.db.insert('threads', { startedBy: userId });
    }
  },
});

export const getCurrentUser = query({
  args: {
    fingerprint: v.string(),
  },
  handler: async (ctx, { fingerprint }) => {
    return ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('fingerprint'), fingerprint))
      .first();
  },
});
