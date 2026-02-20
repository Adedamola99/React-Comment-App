export default function Toast({ toasts }) {
  return (
    <div
      className="fixed bottom-6 right-6 flex flex-col gap-2 z-50"
      role="status"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast animate-slide-in ${
            t.type === "success"
              ? "toast-success"
              : t.type === "error"
                ? "toast-error"
                : ""
          }`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
