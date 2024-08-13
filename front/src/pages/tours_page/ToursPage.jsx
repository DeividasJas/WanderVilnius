import ToursDropdown from '../../components/ToursDropdown';
import { useState } from 'react';
function ToursPage() {
  const [openProfile, setOpenProfile] = useState(true);
  return <>
  {openProfile && <ToursDropdown />}
  </>;
}

export default ToursPage;
