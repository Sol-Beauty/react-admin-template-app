import { useEffect, useState } from "react";

export function useIsHydrated() {
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated;
}
