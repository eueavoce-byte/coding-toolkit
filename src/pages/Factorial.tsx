import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Calculator, AlertTriangle } from "lucide-react";

const Factorial = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{
    number: number;
    factorial: number;
    steps: string[];
    calculation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculateFactorial = (n: number): { value: number; steps: string[] } => {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (n === 0 || n === 1) return { value: 1, steps: [`${n}! = 1`] };

    let result = 1;
    const steps: string[] = [];
    const factors: string[] = [];

    for (let i = 1; i <= n; i++) {
      result *= i;
      factors.push(i.toString());
    }

    steps.push(`${n}! = ${factors.join(" × ")}`);
    steps.push(`${n}! = ${result}`);

    return { value: result, steps };
  };

  const handleCalculate = () => {
    const num = parseInt(number);
    setError("");

    if (isNaN(num)) {
      setError("Por favor, digite um número válido");
      return;
    }

    if (num < 0) {
      setError("O fatorial não está definido para números negativos");
      return;
    }

    if (num > 20) {
      setError("Número muito grande! Digite um número até 20 para visualizar o cálculo");
      return;
    }

    try {
      const { value, steps } = calculateFactorial(num);
      
      // Create step-by-step calculation
      let calculation = "";
      if (num === 0 || num === 1) {
        calculation = `${num}! = 1 (por definição)`;
      } else {
        const factors = Array.from({ length: num }, (_, i) => i + 1);
        calculation = `${num}! = ${factors.join(" × ")} = ${value}`;
      }

      setResult({
        number: num,
        factorial: value,
        steps,
        calculation
      });
    } catch (err) {
      setError("Erro no cálculo");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  const useExample = (num: number) => {
    setNumber(num.toString());
    setError("");
    setResult(null);
  };

  const clear = () => {
    setNumber("");
    setResult(null);
    setError("");
  };

  const examples = [0, 1, 3, 5, 8, 10];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculadora de Fatorial</CardTitle>
            <CardDescription>
              Calcula o fatorial de um número (n! = n × (n-1) × (n-2) × ... × 1). 
              Conceitos: recursão, loops, multiplicação e crescimento exponencial.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Digite um número (0-20)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                min="0"
                max="20"
              />
              <Button 
                onClick={handleCalculate} 
                className="btn-bounce" 
                disabled={!number.trim()}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calcular
              </Button>
              <Button variant="outline" onClick={clear}>
                Limpar
              </Button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Examples */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Exemplos para testar:</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example) => (
                  <Badge
                    key={example}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => useExample(example)}
                  >
                    {example}!
                  </Badge>
                ))}
              </div>
            </div>

            {/* Factorial explanation */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground">
                  <strong>O que é fatorial?</strong> O fatorial de um número n (escrito como n!) 
                  é o produto de todos os inteiros positivos menores ou iguais a n. 
                  Por exemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120
                </p>
              </CardContent>
            </Card>

            {/* Result */}
            {result && (
              <Card className="result-appear">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {result.number}! = {result.factorial.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Cálculo passo a passo:</span>
                        <div className="bg-muted p-3 rounded font-mono text-sm mt-1">
                          {result.calculation}
                        </div>
                      </div>
                      
                      {result.number > 1 && (
                        <div>
                          <span className="font-medium">Explicação:</span>
                          <div className="text-sm text-muted-foreground mt-1">
                            Multiplicamos todos os números de 1 até {result.number}: {" "}
                            {Array.from({ length: result.number }, (_, i) => i + 1).join(" × ")}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm text-muted-foreground bg-accent/10 p-3 rounded">
                        <strong>Curiosidade:</strong> O fatorial cresce muito rapidamente! 
                        {result.number >= 10 && ` ${result.number}! já tem ${result.factorial.toString().length} dígitos.`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Factorial;