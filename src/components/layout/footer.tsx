export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {currentYear} ScrummingIT Web Design. All rights reserved.</p>
        <p className="text-sm mt-1">
          Made with <span role="img" aria-label="love">❤️</span> by Firebase Studio
        </p>
      </div>
    </footer>
  );
}
