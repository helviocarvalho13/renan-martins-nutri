import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">Renan Martins Nutricionista</span>
          </div>
          <p className="text-xs text-muted-foreground" data-testid="text-footer-copyright">
            2024 Renan Martins. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
