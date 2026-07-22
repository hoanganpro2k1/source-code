'use client';

import { MessageCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function ChatWidget() {
  return (
    <Button size="icon-lg" className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/80" aria-label="Open chat">
      <MessageCircle />
    </Button>
  );
}
