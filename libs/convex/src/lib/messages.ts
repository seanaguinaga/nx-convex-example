import { Doc, Id } from './_generated/dataModel';
import { mutation, query, QueryCtx } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: { threadId: v.id('threads') },
  handler: async (ctx, { threadId }) => {
    const thread = await ctx.db.get(threadId);
    if (thread) {
      const messages = await getMessagesForThread(ctx, thread._id);

      const users = new Map<Id<'users'>, Doc<'users'>>();

      for (const message of messages) {
        if (!users.has(message.userId)) {
          const user = await ctx.db.get(message.userId);
          users.set(message.userId, user!);
        }
      }

      return { ...thread, messages, userMap: Object.fromEntries(users) };
    } else {
      return null;
    }
  },
});

export async function getMessagesForThread(
  ctx: QueryCtx,
  threadId: Id<'threads'>
) {
  const messages = await ctx.db
    .query('messages')
    .filter((q) => q.eq(q.field('threadId'), threadId))
    .collect();

  return messages;
}

export const send = mutation({
  args: {
    threadId: v.id('threads'),
    userId: v.id('users'),
    body: v.string(),
  },
  handler: async (ctx, { threadId, userId, body }) => {
    return ctx.db.insert('messages', { threadId, userId, body });
  },
});
