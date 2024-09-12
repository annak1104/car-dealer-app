import '../app/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon-32x32.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Car dealer app</title>
      </head>
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
