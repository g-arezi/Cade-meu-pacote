import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Cadê Meu Pacote!?',
  description: 'Rastreamento unificado de encomendas',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        <header className="border-b border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold tracking-tight">Cadê Meu Pacote!?</h1>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">
          {children}
        </main>
        <footer className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-neutral-500">
          <div className="space-y-2">
            <div>&copy; {new Date().getFullYear()} Cadê Meu Pacote!?</div>
            <div>
              Desenvolvido por  
              <a 
                href="https://portifolio-beta-five-52.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-600 hover:text-brand-700 underline transition-colors"
              >
                <strong> Gabriel Arezi</strong>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
