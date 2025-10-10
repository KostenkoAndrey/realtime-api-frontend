import React from 'react';

export interface SvgIconProps {
  name: string;
  className: string;
}

const SvgIcon = ({ name, className }: SvgIconProps) => {
  return (
    <svg className={className}>
      <use href={`/svg/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
