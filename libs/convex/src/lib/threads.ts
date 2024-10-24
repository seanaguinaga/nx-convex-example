import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const threads = await ctx.db.query('threads').collect();

    return Promise.all(
      threads.map(async (thread) => {
        const { name } = (await ctx.db.get(thread.startedBy))!;

        const messages = await ctx.db
          .query('messages')
          .filter((q) => q.eq(q.field('threadId'), thread._id))
          .take(11);

        return {
          ...thread,
          startedByName: name,
          messageCount: messages.length,
        };
      })
    );
  },
});

export const getLatest = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    const thread = await ctx.db
      .query('threads')
      .filter((q) => q.eq(q.field('startedBy'), userId))
      .order('desc')
      .first();
    return thread;
  },
});

export const create = mutation({
  args: {
    startedBy: v.id('users'),
  },
  handler: async (ctx, { startedBy }) => {
    return await ctx.db.insert('threads', { startedBy });
  },
});
