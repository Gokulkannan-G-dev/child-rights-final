import { createContext, useCallback, useEffect, useState } from "react";
import * as notificationService from "../services/notificationService.js";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await notificationService.listNotifications();
      setNotifications(data?.notifications || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("crp_token");
    if (token) refresh();
  }, [refresh]);

  const markRead = useCallback(async (id) => {
    await notificationService.markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, loading, refresh, markRead }}>
      {children}
    </NotificationContext.Provider>
  );
}
