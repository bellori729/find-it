import bookmark_icon from '@/assets/icons/icon_bookmark_detail.svg';
import bookmark_icon_fill from '@/assets/icons/icon_bookmark_detail_fill.svg';
import useBookmarkStore from '@/store/bookmark/bookmark';
import KakaoMap from '@/components/Detail/atom/KakaoMap';
import { useEffect } from 'react';
import { getAllData, getSearchId } from '@/lib/utils/getAPIData';
import {
  lostAllData,
  lostSearchData,
  lostSearchId,
} from '@/lib/utils/lostAPIData';

interface DetailType {
  item_name: string;
  date: string;
  place: string;
  content: string;
  item_image: string;
  storage: string;
  phone: string;
  mgmt_num: string;
  item_type: string;
}

const isEmpty = (value: string) => {
  return value.length !== 0;
};

const data: DetailType = {
  item_name: '종이가방',
  date: '2021-10-10',
  place: '피시방',
  content: '종이로 만든 가방입니다. 피시방에서 주움.',
  item_image: '',
  storage: '멋쟁이 사자처럼',
  phone: '010-1234-5678',
  mgmt_num: 'ff123456',
  item_type: '가방 > 종이가방',
}; // 실제 데이터는 API를 통해 받아온다.

const Detail: React.FC = () => {
  const bookmark = useBookmarkStore((state) => state.bookmark);

  const isBookmarked = (bookmark: boolean) => {
    if (bookmark) {
      return bookmark_icon_fill;
    }
    return bookmark_icon;
  };

  useEffect(() => {
    (async () => {
      // const data = await lostSearchData('가방');

      // console.log(data);

      // const detailData = await lostSearchId('L2024030800000026');

      // console.log(detailData);

      const lostData = await lostAllData();

      console.log('lostAllData');
      console.log(lostData);
    })();
  }, []);

  return (
    <div className="w-375px leading-[1.3]">
      <div className="flow-root h-250px w-full bg-slate-500">
        {isEmpty(data.item_image) && (
          <img src={data.item_image} alt="item_image" />
        )}
        <span className="mt-40px block text-center text-24px text-white">
          사진 자리
        </span>
      </div>
      <div className="relative">
        <form className="absolute right-30px top-2px">
          <label htmlFor="bookmark">
            <img
              src={isBookmarked(bookmark)}
              alt="bookmark"
              className="h-18px w-18px"
            />
          </label>
          <input
            type="checkbox"
            id="bookmark"
            hidden
            onChange={() => {
              useBookmarkStore.setState({ bookmark: !bookmark });
              console.log(bookmark);
            }}
          />
        </form>
        <ul className="mt-28px flex flex-col gap-8px px-30px text-12px">
          <li>
            <dl>
              <dt className="sr-only">물품명</dt>
              <dd className="text-20px">{data.item_name}</dd>
            </dl>
          </li>
          <li className="mt-20px">
            <dl className="flex gap-22px">
              <dt className="">습득장소</dt>
              <dd>{data.place}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt className="">습득일자</dt>
              <dd>{data.date}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt>관리번호</dt>
              <dd className="text-gray-400">{data.mgmt_num}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt className="">물품분류</dt>
              <dd className="text-gray-400">{data.item_type}</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>상세내용</dt>
              <dd className="mt-8px text-gray-400">{data.content}</dd>
            </dl>
          </li>
        </ul>
      </div>

      <div className="mb-33px mt-28px h-10px border-t border-t-gray-300 bg-gray-200" />

      <div className="relative">
        <button
          type="button"
          className="absolute -top-4px right-30px rounded-full border border-primary px-12px py-4px text-10px text-primary"
        >
          전화하기
        </button>
        <ul className="flex flex-col gap-8px px-30px text-12px">
          <li>
            <dl className="flex gap-22px">
              <dt>보관장소</dt>
              <dd>{data.storage}</dd>
            </dl>
          </li>
          <li>
            <dl className="flex gap-22px">
              <dt>전화번호</dt>
              <dd>{data.phone}</dd>
            </dl>
          </li>
        </ul>
        <div className="mt-28px h-375px bg-slate-500 text-center text-24px text-white">
          <KakaoMap place={data.storage} className="h-full w-full" />
        </div>

        <button
          type="button"
          className="mx-auto mt-28px block rounded-20px border border-black px-128px py-16px"
        >
          공유하기
        </button>
      </div>
    </div>
  );
};

export default Detail;
function loatSearchData(arg0: string) {
  throw new Error('Function not implemented.');
}
