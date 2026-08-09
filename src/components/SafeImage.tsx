'use client';

import { useState } from 'react';
import { Image, ImageProps } from 'react-bootstrap';

interface SafeImageProps extends ImageProps {
  fallbackSrc: string;
}

export default function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {

  const [hasError, setHasError] = useState(false);

  const isInvalidSrc = !src || (typeof src === 'string' && src.trim() === '');
  const imgSrc = hasError || isInvalidSrc ? fallbackSrc : src;

  return (
    <Image
      {...props}
      src={imgSrc as string}
      alt={alt}
      onError={() => {
        if (!hasError) {
        setHasError(true);
        }
      }}
    />
  );
}