import { useState } from 'react';

function useToggleHook(labelOn: string, labelOff: string) {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => setIsVisible(prev => !prev);
  const currentLabel = isVisible ? labelOff : labelOn;

  return { isVisible, toggle, currentLabel };
}

export default useToggleHook;
