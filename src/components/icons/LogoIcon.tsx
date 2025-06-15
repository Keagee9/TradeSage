import type { SVGProps } from 'react';

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12l3-9 3 9-3 9-3-9Z" />
      <path d="M15 3l6 9-6 9" />
      <path d="M9 12h12" />
      <title>TradeSage Logo</title>
    </svg>
  );
}
