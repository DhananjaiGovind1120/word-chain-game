export const metadata = {
  title: 'Word Chain Game',
  description: 'Two-player word game in real-time',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black font-sans">
        {children}
      </body>
    </html>
  );
}
