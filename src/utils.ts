export const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const isValid = (
  grid: number[][],
  r: number,
  c: number,
  k: number
): boolean => {
  const notInRow = !grid[r].includes(k);
  const notInColumn = !Array.from({ length: 9 }, (_, i) => grid[i][c]).includes(
    k
  );

  const boxStartRow = Math.floor(r / 3) * 3;
  const boxStartCol = Math.floor(c / 3) * 3;

  const notInBox = !Array.from({ length: 3 }, (_, i) =>
    Array.from({ length: 3 }, (_, j) => grid[boxStartRow + i][boxStartCol + j])
  )
    .flat()
    .includes(k);

  return notInRow && notInColumn && notInBox;
};


