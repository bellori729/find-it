import { IconSelectLocal } from '@/components/common/atom/IconSelectLocal';
import { SelectLocalListFirst, SelectLocalListSecond } from './SelectLocalList';

export const ButtonSelectLocal = ({
  isClick = false,
  firstName = '대분류 선택',
  secondName = '소분류 선택',
}) => {
  const selectColor = '#4785ff';
  const blackColor = (isClick && selectColor) || 'black';
  const firstBorder = (isClick && selectColor) || '#666';
  const secondBorder = (isClick && selectColor) || '#BCBCBC';

  return (
    <div className="flex gap-14px">
      <button
        className="flex items-center rounded-full px-14px py-6px text-10px"
        type="button"
        style={{
          color: blackColor,
          border: `1px solid ${firstBorder}`,
        }}
      >
        {firstName}
        <IconSelectLocal color={blackColor} />
      </button>
      {!(<SelectLocalListFirst />)}
      <button
        className="flex items-center rounded-full px-14px py-6px text-10px"
        type="button"
        style={{
          color: blackColor,
          border: `1px solid ${secondBorder}`,
        }}
      >
        {secondName}
        <IconSelectLocal color={blackColor} />
      </button>
      {!(<SelectLocalListSecond />)}
    </div>
  );
};
