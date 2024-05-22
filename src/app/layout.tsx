import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/app/Components/Navbar/Navbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
