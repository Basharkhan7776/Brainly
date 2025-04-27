import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../atoms';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export function Toast({ message, type, duration = 3000 }: ToastProps) {
  const setToast = useSetRecoilState(toastState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, setToast]);

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  }[type];

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in`}>
        <div className="flex-1">{message}</div>
        <button 
          onClick={() => setToast(null)}
          className="text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
} 