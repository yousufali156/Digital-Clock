import React, { useState, useMemo } from 'react';

// This defines the structure for a 2x2 matrix.
type Matrix = [[number, number], [number, number]];

const MatrixCalculator: React.FC = () => {
    // State to hold the values of Matrix A.
    const [matrixA, setMatrixA] = useState<Matrix>([[1, 2], [3, 4]]);
    // State to hold the values of Matrix B.
    const [matrixB, setMatrixB] = useState<Matrix>([[5, 6], [7, 8]]);
    // State to determine the current operation (add, subtract, or multiply).
    const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');

    // This function updates the matrix values when the user types in an input field.
    const handleMatrixChange = (
        matrix: 'A' | 'B',
        row: number,
        col: number,
        value: string
    ) => {
        // Create a copy of the matrix to avoid direct state mutation.
        const newMatrix: Matrix = matrix === 'A' 
            ? matrixA.map(r => [...r]) as Matrix 
            : matrixB.map(r => [...r]) as Matrix;

        newMatrix[row][col] = parseFloat(value) || 0;

        if (matrix === 'A') {
            setMatrixA(newMatrix);
        } else {
            setMatrixB(newMatrix);
        }
    };

    // This function calculates the result based on the selected operation.
    // useMemo ensures the calculation only runs when the input matrices or operation change.
    const resultMatrix = useMemo<Matrix>(() => {
        const res: Matrix = [[0, 0], [0, 0]];
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                if (operation === 'add') {
                    res[i][j] = matrixA[i][j] + matrixB[i][j];
                } else if (operation === 'subtract') {
                    res[i][j] = matrixA[i][j] - matrixB[i][j];
                } else if (operation === 'multiply') {
                    res[i][j] = matrixA[i][0] * matrixB[0][j] + matrixA[i][1] * matrixB[1][j];
                }
            }
        }
        return res;
    }, [matrixA, matrixB, operation]);

    // This component renders a single matrix input grid.
    const MatrixInput = ({ matrix, matrixName, onChange }: { matrix: Matrix, matrixName: 'A' | 'B', onChange: typeof handleMatrixChange }) => (
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
            <h3 className="text-xl text-center font-bold text-cyan-300 mb-4">2x2 Matrix Calculator</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {/* Input for Matrix A */}
                <MatrixInput matrix={matrixA} matrixName="A" onChange={handleMatrixChange} />
                
                {/* Operation selector */}
                <div className="flex md:flex-col gap-2">
                    <button onClick={() => setOperation('add')} className={`p-2 rounded-full ${operation === 'add' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>+</button>
                    <button onClick={() => setOperation('subtract')} className={`p-2 rounded-full ${operation === 'subtract' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>-</button>
                    <button onClick={() => setOperation('multiply')} className={`p-2 rounded-full ${operation === 'multiply' ? 'bg-cyan-500' : 'bg-[#1e3a5f]'}`}>×</button>
                </div>

                {/* Input for Matrix B */}
                <MatrixInput matrix={matrixB} matrixName="B" onChange={handleMatrixChange} />
            </div>

            {/* Result display */}
            <div className="mt-6 text-center">
                <p className="text-lg font-bold text-amber-400">Result</p>
                <div className="p-4 bg-black/50 rounded-lg inline-block mt-2">
                     <div className="grid grid-cols-2 gap-2">
                         {/* Check if resultMatrix is an array before mapping */}
                         {Array.isArray(resultMatrix) && resultMatrix.map((row: number[], i: number) => 
                            row.map((cell: number, j: number) => (
                                <div key={`res-${i}-${j}`} className="w-16 h-16 flex items-center justify-center text-xl font-bold bg-[#102a43] rounded-md">
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

