import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw } from "lucide-react";

const Dice = () => {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [sides, setSides] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<{ dice: number; sides: number; results: number[]; sum: number }[]>([]);

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

  const rollDice = () => {
    setIsRolling(true);
    
    // Animation delay
    setTimeout(() => {
      const newResults = Array.from({ length: numberOfDice }, () => 
        Math.floor(Math.random() * sides) + 1
      );
      
      const sum = newResults.reduce((acc, val) => acc + val, 0);
      
      setResults(newResults);
      setHistory(prev => [...prev.slice(-9), {
        dice: numberOfDice,
        sides,
        results: newResults,
        sum
      }]);
      setIsRolling(false);
    }, 600);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const getDiceIcon = (value: number) => {
    if (sides === 6 && value >= 1 && value <= 6) {
      const IconComponent = diceIcons[value - 1];
      return <IconComponent className="w-8 h-8" />;
    }
    return <span className="text-2xl font-bold">{value}</span>;
  };

  const sum = results.reduce((acc, val) => acc + val, 0);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerador de Dados</CardTitle>
            <CardDescription>
              Simula o lançamento de dados usando números aleatórios. 
              Conceitos: randomização, loops, arrays e operações matemáticas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Configuration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dice-count">Número de dados</Label>
                <Input
                  id="dice-count"
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfDice}
                  onChange={(e) => setNumberOfDice(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sides-count">Lados por dado</Label>
                <Input
                  id="sides-count"
                  type="number"
                  min="2"
                  max="100"
                  value={sides}
                  onChange={(e) => setSides(Math.max(2, Math.min(100, parseInt(e.target.value) || 6)))}
                />
              </div>
            </div>

            {/* Roll button */}
            <Button 
              onClick={rollDice} 
              disabled={isRolling}
              className="w-full btn-bounce text-lg py-6"
              size="lg"
            >
              {isRolling ? "Rolando..." : "🎲 Rolar Dados"}
            </Button>

            {/* Results */}
            {results.length > 0 && (
              <Card className="result-appear">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <h3 className="text-lg font-semibold">Resultado:</h3>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          className={`bg-primary text-primary-foreground rounded-lg p-4 flex items-center justify-center min-w-[80px] min-h-[80px] ${
                            isRolling ? "dice-roll" : ""
                          }`}
                        >
                          {getDiceIcon(result)}
                        </div>
                      ))}
                    </div>
                    
                    {numberOfDice > 1 && (
                      <div className="text-2xl font-bold text-accent">
                        Soma total: {sum}
                      </div>
                    )}
                    
                    <div className="text-sm text-muted-foreground">
                      {numberOfDice} dado{numberOfDice > 1 ? "s" : ""} de {sides} lado{sides > 1 ? "s" : ""}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Explanation */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong>Como funciona:</strong></p>
                  <p>• Usamos Math.random() para gerar números entre 0 e 1</p>
                  <p>• Multiplicamos pelo número de lados e arredondamos para cima</p>
                  <p>• Fórmula: Math.floor(Math.random() * {sides}) + 1</p>
                  <p>• Cada rolagem é independente e tem probabilidade igual</p>
                </div>
              </CardContent>
            </Card>

            {/* History */}
            {history.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Histórico de Rolagens</CardTitle>
                    <Button variant="outline" size="sm" onClick={clearHistory}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Limpar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {history.slice().reverse().map((roll, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-3 rounded text-sm">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {roll.dice}d{roll.sides}
                          </Badge>
                          <span className="font-mono">
                            [{roll.results.join(", ")}]
                          </span>
                        </div>
                        {roll.dice > 1 && (
                          <Badge variant="secondary">
                            Total: {roll.sum}
                          </Badge>
                        )}
                      </div>
                    ))}
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

export default Dice;