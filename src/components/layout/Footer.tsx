export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
        <p>&copy; {currentYear} by ASPENOVA. All rights reserved.</p>
        <p className="text-xs mt-1">
          Designed with minimalism and modernity in mind.
        </p>
      </div>
    </footer>
  );
}
