import "../styles/grid.css";
interface props {
  sudokuGrid: number[][];
  activeCell: number[] | null;
}
const Grid = ({ sudokuGrid, activeCell }: props) => {
  return (
    <table>
      <tbody>
        {sudokuGrid.map((row, r) => {
          return (
            <tr key={r}>
              {row.map((val, c) => {
                const inRow = activeCell && activeCell[0] === r;
                const inCol = activeCell && activeCell[1] === c;
                const isExact =
                  activeCell && activeCell[0] === r && activeCell[1] === c;
                let color = "";
                if (inRow) {
                  color = "row-h";
                }
                if (inCol) {
                  color = "col-h";
                }
                if (isExact) {
                  color = "exact-h";
                }

                return (
                  <td key={c} className={color}>
                    {val == 0 ? "" : val}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;
