import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavbar from "@/app/Components/Navbar/Navbar";
import MainNavbar from "@/components/NavBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
