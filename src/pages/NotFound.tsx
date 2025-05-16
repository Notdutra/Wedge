import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-6 text-muted-foreground">
        Sorry, the page you are looking for does not yet exist...
      </p>
      <Link to="/" className="text-primary underline hover:text-primary/80">
        Go back home
      </Link>
    </div>
  );
}
