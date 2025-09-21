import RootLayoutClientWrapper from "./RootLayoutClientWrapper";

import "./globals.css";

// Component to render background balls

export const metadata = {
  title: "The Modern Club",
  description: "e-commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
          {/* Floating balls background */}
          {/* <BackgroundDots /> */}
          <RootLayoutClientWrapper>{children}</RootLayoutClientWrapper>

      </body>
    </html>
  );
}
