import { useEffect, useRef, useState } from 'react';
import { createData, getData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import InputForm from '@/components/SignIn/molecule/InputForm';
import {
  GetSidoList,
  GetGunguList,
} from '@/components/SignIn/molecule/GetLocalList';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import ButtonSelectItem from '@/components/common/molecule/ButtonSelectItem';
import SelectCategoryList from '@/components/common/molecule/SelectCategoryList';

type AlertProps =
  | 'doubleCheckEmail'
  | 'doubleCheckNickname'
  | 'doubleCheckPassword'
  | 'invalidValue'
  | 'invalidEmail'
  | 'invalidPassword'
  | 'userDelete'
  | '';

const SignUp = () => {
  /* -------------------------------------------------------------------------- */
  // 유효성 검사용 정규식 : 비번 8자이상 20자 이하영문 숫자 특수문자 포함
  const regex = {
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pwRegex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/,
  };
  /* -------------------------------------------------------------------------- */
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordCheckType, setPasswordCheckType] = useState('password');

  const [alertEmail, setAlertEmail] = useState<AlertProps>();
  const [alertPassword, setAlertPassword] = useState<AlertProps>();
  const [alertPasswordCheck, setAlertPasswordCheck] = useState<AlertProps>();
  const [alertNickname, setAlertNickname] = useState<AlertProps>();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const nicknameRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  // 이메일 입력 & 정규식 검사
  const [valiEmailForm, setValiEmailForm] = useState(false);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setEmailValue(newValue);

    if (!newValue.match(regex.emailRegex)) {
      setAlertEmail('invalidEmail');
      setValiEmailForm(false);
    } else {
      setAlertEmail('');
      setValiEmailForm(true);
    }
  };
  // 비밀번호 입력 & 정규식 검사
  const [valiPasswordForm, setValiPasswordForm] = useState(false);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordValue(newValue);
    if (!newValue.match(regex.pwRegex)) {
      setAlertPassword('invalidPassword');
      setValiPasswordForm(false);
    } else {
      setAlertPassword('');
      setValiPasswordForm(true);
    }
  };
  // 비밀번호 입력 & 동일 검사
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordCheckValue(newValue);
    if (newValue !== passwordValue) {
      setAlertPasswordCheck('doubleCheckPassword');
    } else {
      setAlertPasswordCheck('');
    }
  };
  // 닉네임 입력
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNicknameValue(newValue);
  };

  /* -------------------------------------------------------------------------- */

  // 이메일 중복 확인    ----------------------------------->> 이메일 폼 맞아야지 중복 체크 가능
  const [valiEmailDouble, setValiEmailDouble] = useState(false);
  const handleDoubleCheckEmail = async () => {
    try {
      const records = await getData('users', {
        filter: `email="${emailValue}"`, //pb 에서 조건 충족 리스트 가져옴(객체 1개배열)
      });
      const realdata = records && records[0];
      const emailData = realdata && realdata.email; //db 이메일 불러와지면 중복띄우기
      if (emailData === emailValue) {
        setAlertEmail('doubleCheckEmail');
        setValiEmailDouble(false);
      } else {
        setAlertEmail('');
        alert('사용 가능한 이메일 입니다.'); /// ----------------------------------->> 모달 창으로 바꾸기
        setValiEmailDouble(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임 중복확인   ----------------------------------->> 닉네임 빈문자 아닐때 작동
  const [valiNickDouble, setValiNickDouble] = useState(false);
  const handleDoubleCheckNickname = async () => {
    try {
      const records = await getData('users', {
        filter: `nickname="${nicknameValue}"`, //pb 에서 조건 충족 리스트 가져옴(객체 1개배열)
      });
      const realdata = records && records[0];
      const nicknameData = realdata && realdata.nickname; //db 닉네임 데이터 불러와지면 중복띄우기
      if (nicknameData === nicknameValue) {
        setAlertNickname('doubleCheckNickname');
        setValiNickDouble(false);
      } else {
        setAlertNickname('');
        alert('사용 가능한 닉네임 입니다.'); /// ----------------------------------->> 모달 창으로 바꾸기
        setValiNickDouble(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 비번 보이기 눈 버튼 : 인풋 타입을 텍스트로 바꿈
  const handleEyePassword = () => {
    setPasswordType((passwordType === 'password' && 'text') || 'password');
  };
  const handleEyePasswordCheck = () => {
    setPasswordCheckType(
      (passwordCheckType === 'password' && 'text') || 'password'
    );
  };
  /* -------------------------------------------------------------------------- */
  // 딜리트 버튼 실행 : 값초기화와 빈문자로 바꾸기
  const handleDeleteEmail = () => {
    setEmailValue('');
    setAlertEmail('');
    setValiEmailDouble(false);
  };
  const handleDeletePassword = () => {
    setPasswordValue('');
    setAlertPassword('');
  };
  const handleDeletePasswordCheck = () => {
    setPasswordCheckValue('');
    setAlertPasswordCheck('');
  };
  const handleDeleteNickname = () => {
    setNicknameValue('');
    setAlertNickname('');
    setValiNickDouble(false);
  };

  /* -------------------------------------------------------------------------- */
  // 신규 유저 데이터
  const newUserData = {
    email: emailValue,
    emailVisibility: true,
    password: passwordValue,
    passwordConfirm: passwordCheckValue,
    nickname: nicknameValue,
    state: 'temp',
    city: 'temp',
  };
  /* -------------------------------------------------------------------------- */
  // 최종 버튼 활성화 & 데이터 보내기 : 버튼 베리언트를 변경
  const [variant, setVariant] = useState<'submit' | 'disabled'>('disabled');
  useEffect(() => {
    if (
      emailValue !== '' &&
      valiEmailDouble === true &&
      valiPasswordForm === true &&
      passwordValue === passwordCheckValue &&
      nicknameValue !== '' &&
      valiNickDouble === true
    ) {
      setVariant('submit');
    } else {
      setVariant('disabled');
    }
  }, [
    emailValue,
    valiEmailDouble,
    valiPasswordForm,
    passwordValue,
    passwordCheckValue,
    nicknameValue,
    valiNickDouble,
  ]);

  // 유저 데이터 pb에 쓰기
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (variant === 'submit') {
      try {
        const userData = await createData('users', newUserData);
        //페이지 이동하는 함수
        window.location.href = '/welcome';
        return userData;
      } catch (error) {
        console.error('회원가입 유저 데이터 보내기 에러났슈:', error);
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  // 리스트 렌더링
  const [renderList, setRenderList] = useState(false);
  const [selectItem, setSelectItem] = useState('');
  // 리스트 컴포넌트 데이터 종류 전달
  const sidoList = GetSidoList(); // 문자열로 된 배열 반환
  const gunguList = GetGunguList();
  const [dataList, setDataList] = useState(sidoList);

  // 대분류 클릭시 대분류 리스트 랜더링
  const handleFirstItem = () => {
    setRenderList(true);
    setDataList(sidoList);
  };
  // 소분류 클릭시 소분류 리스트 랜더링
  const handleSecondItem = () => {
    setRenderList(true);
    setDataList(gunguList);
  };
  // 하위 컴포넌트에서 찍은거 가져오기?
  const handleSelectItem = (item: string) => {
    setSelectItem(item);
  };

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  // jsx 반환
  return (
    <>
      <div className="flex flex-col items-center ">
        <Header isShowPrev={true} children="회원가입" empty={true} />
        <div className="flex flex-col items-center">
          <form className="w-375px px-20px pt-30px" onSubmit={createUser}>
            <InputForm
              ref={emailRef}
              type="email"
              title="useremail"
              placeholder="이메일 주소를 입력해주세요."
              value={emailValue}
              onChange={handleEmail}
              iconDoubleCheck={true}
              iconDelete={!!emailValue}
              onClickDoubleCheck={handleDoubleCheckEmail}
              onClickDelete={handleDeleteEmail}
              alertCase={alertEmail}
              disabledDoubleCheck={!valiEmailForm}
            />
            <InputForm
              ref={passwordRef}
              marginTop="40px"
              type={passwordType}
              title="userpassword"
              placeholder="비밀번호를 입력해주세요."
              value={passwordValue}
              onChange={handlePassword}
              iconDoubleCheck={false}
              iconDelete={!!passwordValue}
              iconEyeToggle={true}
              onClickDelete={handleDeletePassword}
              onClickEye={handleEyePassword}
              alertCase={alertPassword}
            />
            <InputForm
              marginTop="8px"
              ref={passwordCheckRef}
              type={passwordCheckType}
              title="userpasswordCheck"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              value={passwordCheckValue}
              onChange={handlePasswordCheck}
              iconDoubleCheck={false}
              iconDelete={!!passwordCheckValue}
              iconEyeToggle={true}
              onClickDelete={handleDeletePasswordCheck}
              onClickEye={handleEyePasswordCheck}
              alertCase={alertPasswordCheck}
            />
            <InputForm
              marginTop="40px"
              ref={nicknameRef}
              type="text"
              title="nickname"
              placeholder="닉네임을 입력해주세요."
              value={nicknameValue}
              onChange={handleNickname}
              iconDoubleCheck={true}
              iconDelete={!!nicknameValue}
              onClickDoubleCheck={handleDoubleCheckNickname}
              onClickDelete={handleDeleteNickname}
              alertCase={alertNickname}
              disabledDoubleCheck={!nicknameValue}
            />
            <div className="mt-10px flex h-48px w-full items-center justify-between ">
              <input
                style={{ pointerEvents: 'none', cursor: 'default' }}
                className="text-#989898 w-full pl-2.5 pr-2.5 text-14px"
                type="text"
                name="거주지역"
                readOnly
                placeholder="거주지역을 선택해주세요"
              />
              <ButtonSelectItem
                firstName={selectItem || '시/도'}
                secondName={selectItem || '군/구'}
                onClickFirst={handleFirstItem}
                onClickSecond={handleSecondItem}
              />
            </div>
            <div className="box-border flex flex-col items-center gap-[1rem]	pt-80px">
              <ButtonVariable buttonText="완료" variant={variant} />
            </div>
          </form>
        </div>
        {renderList && (
          <SelectCategoryList
            title={'거주지를 선택하세요.'}
            dataList={dataList}
            getSelectItem={handleSelectItem}
          />
        )}
      </div>
    </>
  );
};

export default SignUp;
