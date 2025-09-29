import React from 'react';

const Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    {props.children}
  </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Icon>
);

export const AlertTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </Icon>
);

export const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props} className={`w-6 h-6 ${props.className || ''}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </Icon>
);

export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </Icon>
);

export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} strokeWidth={1}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797zM15.362 5.214A8.252 8.252 0 0012 3a8.25 8.25 0 00-3.362 2.214m5.724 0a8.287 8.287 0 01-5.724 0m5.724 0a4.5 4.5 0 01.522 6.164.75.75 0 00.976.273 8.287 8.287 0 005.472-4.148c.656-.966.114-2.263-.928-2.675a4.5 4.5 0 00-5.22-1.63z" />
  </Icon>
);

export const SpinnerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props} className={`animate-spin ${props.className || ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.696a4.126 4.126 0 01-2.31 1.625 4.126 4.126 0 01-4.256 0 4.126 4.126 0 01-2.31-1.625m4.992 0c.879 0 1.57.024 2.233.067a4.125 4.125 0 013.92 3.92c.043.663.067 1.354.067 2.233 0 .879-.024 1.57-.067 2.233a4.125 4.125 0 01-3.92 3.92c-.663.043-1.354.067-2.233.067-.879 0-1.57-.024-2.233-.067a4.125 4.125 0 01-3.92-3.92c-.043-.663-.067-1.354-.067-2.233 0-.879.024-1.57.067-2.233a4.125 4.125 0 013.92-3.92z" />
  </Icon>
);

export const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
  </Icon>
);

export const ServerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
  </Icon>
);

export const FileDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <Icon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </Icon>
);

export const ClipboardListIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </Icon>
);

export const FileTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <Icon {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM10.5 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm1.5-1.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm.75 6a.75.75 0 110-1.5.75.75 0 010 1.5zm-3 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-1.5-1.5a.75.75 0 110-1.5.75.75 0 010 1.5zM6 6.75h.75v.75H6v-.75zm.75 3h-.75v.75h.75v-.75zm.75 2.25h.75v.75h-.75v-.75zm-.75 3h.75v.75h-.75v-.75z" />
  </Icon>
);
