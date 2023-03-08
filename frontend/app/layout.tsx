import './globals.css';
import { LayoutContent } from './layoutContent';
import { Providers } from './providers';

export const metadata = {
  title: 'Create Next App',
  description: 'Simple Github app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <LayoutContent>{children}</LayoutContent>
      </Providers>
    </html>
  );
}
