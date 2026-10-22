# push-log

The push notification driver of P-Chat: implements the domain port `INotifier` (R16, an offline
participant is told about a message) by logging the notification.

It is the stand-in for a real push service. To send real notifications, add a sibling lib under
`libs/chat/drivers/push/` (web push, FCM, APNs, e-mail...) implementing the same port, and swap it in
`CHAT_NOTIFIER_PROVIDER` (`chat.main.config.providers.module.ts`). Nothing in `core/` changes.
