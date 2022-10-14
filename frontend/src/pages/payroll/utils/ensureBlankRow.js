import { isEqual, last } from "lodash";

const BLANK_ROW = [{ value: null }];

export default function ensureBlankRow(data) {
  if (!isEqual(last(data), BLANK_ROW)) {
    return [...data, BLANK_ROW];
  }
  return data;
}
