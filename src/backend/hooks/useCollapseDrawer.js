import { useContext } from 'react';
import { CollapseDrawerContext } from '../providers/CollapseDrawerProvider';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
