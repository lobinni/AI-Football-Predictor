import { Bell, BellOff, Check, Trash2, X, Trophy, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { useNotifications, Notification } from '../hooks/useNotifications';
import { useState } from 'react';

export function NotificationCenter() {
  const {
    notifications,
    unreadCount,
    permission,
    requestPermission,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotifications();

  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'match':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'result':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                <span className="font-bold">Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Permission Banner */}
            {permission !== 'granted' && (
              <div className="p-3 bg-yellow-50 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-yellow-800">
                  <BellOff className="w-4 h-4" />
                  <span>Enable notifications</span>
                </div>
                <button
                  onClick={requestPermission}
                  className="text-xs bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Enable
                </button>
              </div>
            )}

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="p-2 border-b flex items-center justify-between bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-600 hover:text-emerald-600 flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Mark all read
                </button>
                <button
                  onClick={clearAll}
                  className="text-xs text-gray-600 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Clear all
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No notifications yet</p>
                  <p className="text-xs mt-1">We'll notify you about matches and results</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markAsRead(notif.id)}
                      className={`p-3 hover:bg-gray-50 cursor-pointer flex gap-3 ${
                        !notif.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {getNotificationIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notif.read ? 'font-semibold' : ''} text-gray-800`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(notif.timestamp)}
                        </p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
