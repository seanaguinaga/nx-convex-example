'use client';

import { ReactNode } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export function AppLayout({
  children,
  appTitle,
}: {
 appTitle: string,
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col h-screen container mx-auto px-4">
      <header className="bg-white ">
        <div className="mx-auto flex max-w-7xl items-center justify-center p-2 lg:px-8">
          <ChatBubbleLeftRightIcon className="h-8 w-auto text-purple-500 mr-2" />
          <h1>{appTitle}</h1>
        </div>
      </header>
      <div className="flex-1 flex flex-row overflow-y-hidden p-4">
        {children}
      </div>
    </div>
  );
}
