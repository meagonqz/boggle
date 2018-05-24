import { differenceWith as _differenceWith } from 'lodash';
import { isEqual as _isEqual } from 'lodash';

export const constructIndices = (colIndex, rowIndex, size) => {
  const left = colIndex - 1;
  const right = colIndex + 1;
  const top = rowIndex - 1;
  const bottom = rowIndex + 1;
  const indices = [];

  if(left >= 0) {
    indices.push([left, rowIndex])
    if(top >= 0) {
      indices.push([left, top])
    }

    if(bottom < size) {
      indices.push([left, bottom])
    }
  }
  if(right < size) {
    indices.push([right, rowIndex])
    if(top >= 0) {
      indices.push([right, top])
    }

    if(bottom < size) {
      indices.push([right, bottom])
    }
  }

  if(top >= 0) {
    indices.push([colIndex, top])
  }

  if(bottom < size) {
    indices.push([colIndex, bottom])
  }
  const all = constructAllIndices(size);
  const disabled = _differenceWith(all, indices, _isEqual).map(a => ({ col: a[0], row: a[1] }));
  return { indices, disabled };
}

export const constructAllIndices = (size) => {
  const indices = [];
  for(let i=0; i < size; i++){
    for(let j=0; j < size; j++) {
      indices.push([i,j])
    }
  }
  return indices;
}