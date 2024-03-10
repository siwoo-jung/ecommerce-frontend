import "../styles/globals.css";

import Navbar from "./components/Navbar";

export const metadata = {
  title: "Welcome to Siwoo's",
  description: "Siwoo's eCommerce site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
