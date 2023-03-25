import React from 'react';
import StyledCounter from './StyledCounter';
import StyledCounterItem from './StyledCounterItem';

function Counter({ counterValue, digit }) {
  let counterValues = counterValue.toString().split('');

  const isEndCount = digit < counterValues.length;

  if (digit > counterValues.length) {
    const digitNumbers = new Array(digit - counterValues.length).fill(0);
    counterValues = [...digitNumbers, ...counterValues];
  } else if (isEndCount) {
    counterValues = new Array(digit).fill(9);
  }

  return (
    <StyledCounter>
      {counterValues.map((value, i) => (
        <StyledCounterItem value={value} key={i} />
      ))}
    </StyledCounter>
  );
}

export default Counter;
