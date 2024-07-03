import { useState, useEffect, } from 'preact/hooks';
import { render } from 'preact'

function Toast({ message, type }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setVisible(false);
      }, 300); // duración del fade out
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const className = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  if (!visible) return null;

  return (
    <div
      id="toast-bottom-right"
      class={`fixed flex items-center justify-center w-full max-w-xs p-4 space-x-4 text-gray-200 ${className} divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 transition duration-300 ${fadeOut ? 'opacity-0' : ''}`}
      role="alert"
    >
      <div class="text-sm font-normal">{message}</div>
    </div>
  );
}

export function toast(message, type) {
  const toastElement = document.createElement('div');
  document.body.appendChild(toastElement);
  render(<Toast message={message} type={type} />, toastElement);

  setTimeout(() => {
    toastElement.remove();
  }, 5300); // 5000ms (tiempo de vida del toast) + 300ms (duración del fade out)
}