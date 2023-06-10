
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCupmzWC1NxAxLqhYnkyUfBAu7xFPFHN0Y',
  authDomain: 'ff-todo-vue.firebaseapp.com',
  projectId: 'ff-todo-vue',
  storageBucket: 'ff-todo-vue.appspot.com',
  messagingSenderId: '16140836055',
  appId: '1:16140836055:web:a4ca8e49b630334b132492'
}


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export {
    db
}