export default function UserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow flex-col">
        <div className="w-full border py-4">
          <div>sadf</div>
        </div>
        {children}
      </div>
      <div>Admin Footer</div>
    </div>
  );
}
