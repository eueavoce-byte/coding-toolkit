import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Type, Hash, Dice6, Code, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const tools = [
    {
      path: "/calculator",
      icon: Calculator,
      title: "Calculadora Básica",
      description: "Operações aritméticas com histórico de cálculos",
      concepts: ["Variáveis", "Funções", "Condicionais", "Estado"]
    },
    {
      path: "/palindrome", 
      icon: Type,
      title: "Detector de Palíndromos",
      description: "Verifica se palavras ou frases são palíndromos",
      concepts: ["Strings", "Arrays", "Loops", "Comparação"]
    },
    {
      path: "/factorial",
      icon: Hash, 
      title: "Calculadora de Fatorial",
      description: "Calcula fatoriais com explicação passo a passo",
      concepts: ["Recursão", "Multiplicação", "Loops", "Matemática"]
    },
    {
      path: "/dice",
      icon: Dice6,
      title: "Gerador de Dados", 
      description: "Simula lançamento de dados com números aleatórios",
      concepts: ["Randomização", "Arrays", "Math.random()", "Probabilidade"]
    }
  ];

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Manhã do Conhecimento
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Aprenda programação de forma prática e interativa através de pequenos desafios e ferramentas educativas
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Code className="w-5 h-5" />
              <span>Conceitos de Python</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Target className="w-5 h-5" />
              <span>Prática imediata</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Lightbulb className="w-5 h-5" />
              <span>Feedback visual</span>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Ferramentas Interativas</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Cada ferramenta demonstra conceitos fundamentais da programação com exemplos práticos e resultados imediatos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              
              return (
                <Card key={tool.path} className="tool-card group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <CardDescription className="text-base">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-muted-foreground">Conceitos abordados:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tool.concepts.map((concept, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent/20 text-accent-foreground rounded text-sm"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Link to={tool.path}>
                      <Button className="w-full btn-bounce">
                        Experimentar
                        <Icon className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-muted/30 rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Por que programação prática?</h2>
            <p className="text-muted-foreground">
              O melhor jeito de aprender programação é praticando
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Aprendizado Direto</h3>
              <p className="text-sm text-muted-foreground">
                Veja os conceitos funcionando na prática, sem complexidade desnecessária
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Feedback Imediato</h3>
              <p className="text-sm text-muted-foreground">
                Experimente, teste e veja os resultados instantaneamente
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Fundamentos Sólidos</h3>
              <p className="text-sm text-muted-foreground">
                Construa confiança com conceitos que são base para qualquer linguagem
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Pronto para começar?</h2>
            <p className="text-muted-foreground">
              Escolha uma ferramenta acima e comece a experimentar com conceitos de programação
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
