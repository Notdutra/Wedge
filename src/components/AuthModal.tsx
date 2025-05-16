import { Dialog } from "@/components/ui/dialog";
import AuthForm from "@/components/AuthForm";

export default function AuthModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <AuthForm mode="login" onModeChange={() => {}} onClose={onClose} />
    </Dialog>
  );
}
