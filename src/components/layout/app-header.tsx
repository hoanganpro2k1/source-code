interface AppHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function AppHeader({ left, right }: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
      {left && <div className="flex flex-1 items-center gap-2">{left}</div>}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
    </header>
  );
}
