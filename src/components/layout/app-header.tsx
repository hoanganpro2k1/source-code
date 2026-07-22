interface AppHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function AppHeader({ left, right }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur-xl">
      {left && <div className="flex flex-1 items-center gap-2">{left}</div>}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </header>
  );
}
