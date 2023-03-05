import StyledControlPanel from './StyledControlPanel';

import BombCounter from '../BombCounter/BombCounter';
import SmileButton from '../SmileButton/SmileButton';
import Timer from '../Timer/Timer';

function ControlPanel() {
  return (
    <StyledControlPanel>
      <BombCounter digit={3} />
      <SmileButton />
      <Timer digit={3} />
    </StyledControlPanel>
  );
}

export default ControlPanel;
