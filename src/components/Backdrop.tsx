import React from 'react';

/** Base lisa do fundo global. O dither é renderizado por cima, no App.tsx. */
export default function Backdrop() {
  return <div aria-hidden="true" className="backdrop-root" />;
}
