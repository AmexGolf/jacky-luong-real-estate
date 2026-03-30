export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#F5F0EB" }}>
        {children}
      </body>
    </html>
  );
}
