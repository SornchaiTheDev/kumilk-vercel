import "@/styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="px-3">{children}</div>;
}
