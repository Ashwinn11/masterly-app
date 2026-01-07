'use client';

import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useConfirmationStore } from '@/lib/utils/confirmationUtils';

/**
 * Global confirmation dialog component that should be rendered once at the app root level
 */
export function GlobalConfirmationDialog() {
  const { isOpen, title, message, confirmText, cancelText, variant, confirm, cancel } = useConfirmationStore();

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={cancel}
      onConfirm={confirm}
      title={title}
      description={message}
      confirmText={confirmText}
      cancelText={cancelText}
      variant={variant}
    />
  );
}
