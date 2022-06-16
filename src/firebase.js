import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAmelzzDFdG3B6I6x6Nu6WeJ5Blu89ArQo',
  authDomain: 'yt-clone-777.firebaseapp.com',
  projectId: 'yt-clone-777',
  storageBucket: 'yt-clone-777.appspot.com',
  messagingSenderId: '629600958907',
  appId: '1:629600958907:web:4ddf1e3d193df836526c9e',
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
