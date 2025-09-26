import { Toaster } from 'sonner';

const ToastProvider = () => (
  <Toaster
    position='top-right'
    closeButton={false}
    richColors={false}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast: 'bg-transparent shadow-none border-none p-0',
      },
    }}
  />
);
ToastProvider.displayName = 'ToastProvider';
export { ToastProvider };
