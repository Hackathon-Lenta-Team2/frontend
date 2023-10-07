import { AxiosResponse } from "axios";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return `${day}.${month < 10 ? '0' : ''}${month}.${year}`;
}

export function formatDaysWord(days: number) {
  switch (days) {
    case 1:
      return 'день';
    case 2:
    case 3:
    case 4:
      return 'дня';
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      return 'дней';
    default:
      return 'Invalid number of days';
  }
}

export const checkAnswer = (res: AxiosResponse) => {
  if (res.status >= 400) {
    throw Error(`Ошибка ${res.status}`);
  }
  return res;
};

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string | null, props?: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (typeof value === 'string') {
    value = encodeURIComponent(value);
  }
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
  // setCookie(name, null, { expires: -1 });
}
