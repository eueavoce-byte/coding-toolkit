import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

const Palindrome = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    isPalindrome: boolean;
    cleanText: string;
    reversed: string;
  } | null>(null);
  const [examples] = useState([
    "arara", "osso", "ana", "ovo", "radar", 
    "A cara rajada da jararaca", "Socorram me subi no onibus em marrocos"
  ]);

  const checkPalindrome = () => {
    if (!text.trim()) return;

    // Remove spaces, punctuation, and convert to lowercase
    const cleanText = text
      .toLowerCase()
      .replace(/[^a-zA-ZÀ-ÿ0-9]/g, "");
    
    // Reverse the cleaned text
    const reversed = cleanText.split("").reverse().join("");
    
    // Check if it's a palindrome
    const isPalindrome = cleanText === reversed;
    
    setResult({
      isPalindrome,
      cleanText,
      reversed
    });
  };

  const useExample = (example: string) => {
    setText(example);
    setResult(null);
  };

  const clear = () => {
    setText("");
    setResult(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkPalindrome();
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Detector de Palíndromos</CardTitle>
            <CardDescription>
              Verifica se uma palavra ou frase é um palíndromo (lê-se igual de frente para trás). 
              Conceitos: manipulação de strings, loops, condições e métodos de array.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Digite uma palavra ou frase..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={checkPalindrome} className="btn-bounce" disabled={!text.trim()}>
                Verificar
              </Button>
              <Button variant="outline" onClick={clear} size="icon">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Examples */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Exemplos para testar:</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((example, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => useExample(example)}
                  >
                    {example}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Result */}
            {result && (
              <Card className="result-appear">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    {result.isPalindrome ? (
                      <CheckCircle className="w-6 h-6 text-accent" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                    <span className="text-lg font-semibold">
                      {result.isPalindrome ? "É um palíndromo!" : "Não é um palíndromo"}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Texto original:</span>
                      <div className="bg-muted p-2 rounded font-mono mt-1">"{text}"</div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Texto limpo:</span>
                      <div className="bg-muted p-2 rounded font-mono mt-1">{result.cleanText}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Texto invertido:</span>
                      <div className="bg-muted p-2 rounded font-mono mt-1">{result.reversed}</div>
                    </div>
                    
                    <div className="text-muted-foreground">
                      <strong>Como funciona:</strong> Removemos espaços e pontuação, 
                      convertemos para minúsculas, depois comparamos com a versão invertida.
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

export default Palindrome;