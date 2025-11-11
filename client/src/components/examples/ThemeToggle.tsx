import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-8 space-y-4 text-center">
        <h2 className="text-2xl font-bold">Theme Toggle</h2>
        <p className="text-muted-foreground">
          Click the button below to toggle between light and dark themes.
        </p>
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
        <p className="text-sm text-muted-foreground">
          The theme preference is saved to localStorage.
        </p>
      </div>
    </div>
  );
}