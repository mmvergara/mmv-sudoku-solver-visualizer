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
                const isActive =
                  activeCell && activeCell[0] === r && activeCell[1] === c;
                return (
                  <td key={c} className={isActive ? "highlight" : ""}>
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
