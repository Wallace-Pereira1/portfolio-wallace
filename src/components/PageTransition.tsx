import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  key?: React.Key;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return <div className="w-full flex-1 flex flex-col">{children}</div>;
}
