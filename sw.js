// 安裝 Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 啟用 Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 監聽並顯示來自系統或網頁的通知
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '信用卡還款提醒';
  const options = {
    body: data.body || '你有卡片即將到期，請記得處理！',
    icon: 'icon.png',
    badge: 'icon.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// 點擊通知後的動作（點擊後打開你的網頁）
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});
