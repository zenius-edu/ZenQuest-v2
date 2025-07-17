import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    name: '',
    email: '',
    isLoggedIn: false
  }
});

export const postsState = atom({
  key: 'postsState',
  default: []
});

export const counterState = atom({
  key: 'counterState',
  default: 0
}); 