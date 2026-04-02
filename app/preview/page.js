import { permanentRedirect } from 'next/navigation';

/** Former preview URL — homepage now uses this layout. */
export default function PreviewRedirect() {
  permanentRedirect('/');
}
