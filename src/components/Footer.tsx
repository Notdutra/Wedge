export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 bg-background border-t text-center text-sm text-muted-foreground">
      <span>&copy; {new Date().getFullYear()} Wedge. All rights reserved.</span>
    </footer>
  );
}
