interface LoginForm {
  accountType: 1|2|3;
  credential: string;
  identifier: string;
  imageCode?: string;
  imageCodeToken?: string;
  loginMode: 'ACCOUNT_PASSWORD'|'PHONE_VERIFICATION';
  [propName: string]: any;
}

interface RegisterForm {
  accountType: 1|2|3;
  credential?: string;
  identifier?: string;
  nickname: string;
  qq?: string;
  recommendCode?: string;
  smsCode: string;
  wechat?: string;
  [x: string]: any;
}
