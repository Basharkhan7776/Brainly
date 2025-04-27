import { useSetRecoilState } from 'recoil';
import { toastState } from '../atoms';

export function useToast() {
  const setToast = useSetRecoilState(toastState);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
  };

  const showSuccess = (message: string) => showToast(message, 'success');
  const showError = (message: string) => showToast(message, 'error');
  const showInfo = (message: string) => showToast(message, 'info');

  return {
    showToast,
    showSuccess,
    showError,
    showInfo
  };
} 