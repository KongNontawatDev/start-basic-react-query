import { App, message as antdMessage } from 'antd';
import { createContext, useContext } from 'react';
import type { MessageInstance } from 'antd/es/message/interface';
// 👇 แก้ตรงนี้: ให้ context รับเฉพาะ MessageInstance
const ToastContext = createContext<MessageInstance>(antdMessage);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { message } = App.useApp();
  return (
    <ToastContext.Provider value={message}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
