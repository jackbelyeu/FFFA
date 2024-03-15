import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "@/app/Components/Navbar/Navbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MyNavbar />
        {children}
      </body>
    </html>
  );
}
