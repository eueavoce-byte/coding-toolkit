import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      const operationString = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [...prev.slice(-4), operationString]);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const currentValue = previousValue;
      const newValue = calculate(currentValue, inputValue, operation);
      
      const operationString = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [...prev.slice(-4), operationString]);

      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Calculadora Básica</CardTitle>
            <CardDescription>
              Uma calculadora simples que demonstra operações aritméticas básicas. 
              Conceitos: variáveis, condições, funções e manipulação de estado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Display */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-right text-2xl font-mono font-bold text-foreground min-h-[40px] flex items-center justify-end">
                {display}
              </div>
              {operation && previousValue !== null && (
                <div className="text-right text-sm text-muted-foreground">
                  {previousValue} {operation}
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" onClick={clear} className="col-span-2">
                Limpar
              </Button>
              <Button variant="outline" onClick={() => inputOperator("÷")}>
                ÷
              </Button>
              <Button variant="outline" onClick={() => inputOperator("×")}>
                ×
              </Button>

              <Button variant="outline" onClick={() => inputDigit("7")}>
                7
              </Button>
              <Button variant="outline" onClick={() => inputDigit("8")}>
                8
              </Button>
              <Button variant="outline" onClick={() => inputDigit("9")}>
                9
              </Button>
              <Button variant="outline" onClick={() => inputOperator("-")}>
                -
              </Button>

              <Button variant="outline" onClick={() => inputDigit("4")}>
                4
              </Button>
              <Button variant="outline" onClick={() => inputDigit("5")}>
                5
              </Button>
              <Button variant="outline" onClick={() => inputDigit("6")}>
                6
              </Button>
              <Button variant="outline" onClick={() => inputOperator("+")}>
                +
              </Button>

              <Button variant="outline" onClick={() => inputDigit("1")}>
                1
              </Button>
              <Button variant="outline" onClick={() => inputDigit("2")}>
                2
              </Button>
              <Button variant="outline" onClick={() => inputDigit("3")}>
                3
              </Button>
              <Button variant="default" onClick={performCalculation} className="row-span-2 btn-bounce">
                =
              </Button>

              <Button variant="outline" onClick={() => inputDigit("0")} className="col-span-2">
                0
              </Button>
              <Button variant="outline" onClick={() => inputDigit(".")}>
                .
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Histórico de Cálculos</CardTitle>
                <Button variant="outline" size="sm" onClick={clearHistory}>
                  Limpar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {history.map((calc, index) => (
                  <div key={index} className="text-sm font-mono bg-muted p-2 rounded result-appear">
                    {calc}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Calculator;