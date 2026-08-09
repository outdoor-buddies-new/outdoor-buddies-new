'use client';

import { useState } from 'react';
import { Image, ImageProps } from 'react-bootstrap';

interface SafeImageProps extends ImageProps {
  fallbackSrc: string;
}

export default function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}