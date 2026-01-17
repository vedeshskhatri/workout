'use client';

import * as React from 'react';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const ToastContext = React.createContext<{
  toasts: (ToastProps & { id: string })[];
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
}>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  const toast = (props: ToastProps) => {
    context.addToast(props);
  };

  return { toast, ...context };
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<(ToastProps & { id: string })[]>([]);

  const addToast = React.useCallback((toast: ToastProps) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 5000);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`min-w-[300px] p-4 rounded-lg shadow-lg ${
              toast.variant === 'destructive'
                ? 'bg-red-500 text-white'
                : 'bg-white dark:bg-gray-800 border'
            }`}
          >
            {toast.title && (
              <div className="font-semibold mb-1">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm opacity-90">{toast.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
