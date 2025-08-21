import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Type, Hash, Dice6 } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const tools = [
    { path: "/", icon: Calculator, label: "Início", description: "Página inicial" },
    { path: "/calculator", icon: Calculator, label: "Calculadora", description: "Operações básicas" },
    { path: "/palindrome", icon: Type, label: "Palíndromo", description: "Detector de palíndromos" },
    { path: "/factorial", icon: Hash, label: "Fatorial", description: "Cálculo fatorial" },
    { path: "/dice", icon: Dice6, label: "Dados", description: "Gerador de números" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Manhã do Conhecimento</h1>
                <p className="text-sm text-muted-foreground">Pratique programação de forma interativa</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isActive = location.pathname === tool.path;
                
                return (
                  <Link key={tool.path} to={tool.path}>
                    <Button 
                      variant={isActive ? "default" : "ghost"} 
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden lg:inline">{tool.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Mobile navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-sm">
        <div className="flex justify-around py-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = location.pathname === tool.path;
            
            return (
              <Link key={tool.path} to={tool.path} className="flex-1">
                <Button 
                  variant={isActive ? "default" : "ghost"} 
                  size="sm"
                  className="w-full flex flex-col items-center space-y-1 h-auto py-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{tool.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;