import { isEqual, last, range, max, size } from "lodash";

const BLANK_CELL = { value: null };

export default function ensureBlankCol(data) {
  const maxCols = max(
    data.map(row =>
      isEqual(last(row), BLANK_CELL) ? size(row) : size(row) + 1
    )
  );
  const [headRow, ...tailRows] = data;
  const newHeadRow =
    // If the head row doesn't have the most columns
    size(headRow) < maxCols
      ? [
          // Existing head row data
          ...headRow,
          // Fill in to the max width
          ...range(size(headRow) - maxCols).map(() => BLANK_CELL)
        ]
      : headRow;
  return [
    isEqual(last(newHeadRow), BLANK_CELL)
      ? // Does the head row already end with a blank column?
        newHeadRow
      : // Ensure there's that last blank column
        [...newHeadRow, BLANK_CELL],
    ...tailRows
  ];
}
