import { useEffect, useState } from 'react';

export function ScaledImage({
  small,
  large,
}: {
  small: string;
  large: string;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsReady(true);
    img.src = large;
  }, [large]);

  return <img src={isReady ? large : small} />;
}
