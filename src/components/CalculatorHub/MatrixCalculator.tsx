import React, { useState, useMemo } from "react";

// Explicit 2x2 Matrix type
type Matrix = [[number, number], [number, number]];

const MatrixCalculator: React.FC = () => {
  const [matrixA, setMatrixA] = useState<Matrix>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<Matrix>([
    [5, 6],
    [7, 8],
  ]);
  const [operation, setOperation] = useState<"add" | "subtract" | "multiply">(
    "add"
  );

  // Safely update a cell in the selected matrix
  const handleMatrixChange = (
    matrix: "A" | "B",
    row: number,
    col: number,
    value: string
  ) => {
    const parsed = parseFloat(value) || 0;

    const newMatrix: Matrix =
      matrix === "A"
        ? (matrixA.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? parsed : c))
          ) as Matrix)
        : (matrixB.map((r, i) =>
            r.map((c, j) => (i === row && j === col ? parsed : c))
          ) as Matrix);

    if (matrix === "A") {
      setMatrixA(newMatrix);
    } else {
      setMatrixB(newMatrix);
    }
  };

  // Calculate result matrix
  const resultMatrix = useMemo<Matrix>(() => {
    const res: Matrix = [
      [0, 0],
      [0, 0],
    ];

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        if (operation === "add") {
          res[i][j] = matrixA[i][j] + matrixB[i][j];
        } else if (operation === "subtract") {
          res[i][j] = matrixA[i][j] - matrixB[i][j];
        } else if (operation === "multiply") {
          res[i][j] =
            matrixA[i][0] * matrixB[0][j] + matrixA[i][1] * matrixB[1][j];
        }
      }
    }
    return res;
  }, [matrixA, matrixB, operation]);

  // Reusable matrix input
  const MatrixInput: React.FC<{
    matrix: Matrix;
    matrixName: "A" | "B";
    onChange: typeof handleMatrixChange;
  }> = ({ matrix, matrixName, onChange }) => (
    <div className="flex flex-col items-center">
      <p className="text-lg font-bold mb-2 text-cyan-300">Matrix {matrixName}</p>
      <div className="grid grid-cols-2 gap-2 p-2 bg-black/30 rounded-md">
        {matrix.map((row, i) =>
          row.map((cell, j) => (
            <input
              key={`${matrixName}-${i}-${j}`}
              type="number"
              value={cell}
              onChange={(e) => onChange(matrixName, i, j, e.target.value)}
              className="w-16 h-16 bg-[#1e3a5f] text-center text-xl text-white rounded-md"
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[#102a43] p-6 rounded-2xl shadow-lg max-w-lg mx-auto text-white">
      <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">
        2x2 Matrix Calculator
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <MatrixInput
          matrix={matrixA}
          matrixName="A"
          onChange={handleMatrixChange}
        />

        <div className="flex md:flex-col gap-2">
          <button
            onClick={() => setOperation("add")}
            className={`p-2 rounded-full ${
              operation === "add" ? "bg-cyan-500" : "bg-[#1e3a5f]"
            }`}
          >
            +
          </button>
          <button
            onClick={() => setOperation("subtract")}
            className={`p-2 rounded-full ${
              operation === "subtract" ? "bg-cyan-500" : "bg-[#1e3a5f]"
            }`}
          >
            -
          </button>
          <button
            onClick={() => setOperation("multiply")}
            className={`p-2 rounded-full ${
              operation === "multiply" ? "bg-cyan-500" : "bg-[#1e3a5f]"
            }`}
          >
            ×
          </button>
        </div>

        <MatrixInput
          matrix={matrixB}
          matrixName="B"
          onChange={handleMatrixChange}
        />
      </div>

      {/* Result Display */}
      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-amber-400">Result</p>
        <div className="p-4 bg-black/50 rounded-lg inline-block mt-2">
          <div className="grid grid-cols-2 gap-2">
            {resultMatrix.map((row, i) =>
              row.map((cell, j) => (
                <div
                  key={`res-${i}-${j}`}
                  className="w-16 h-16 flex items-center justify-center text-xl font-bold bg-[#102a43] rounded-md"
                >
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixCalculator;
