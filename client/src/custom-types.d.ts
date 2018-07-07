import { Facebook } from '@/facebook.interfaces';

declare global {
  interface Window {
    FB: Facebook;
    fbAsyncInit: () => void;
  }
}
