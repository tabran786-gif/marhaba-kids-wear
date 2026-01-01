// 🔥 Firebase Configuration
// ⚠️ REPLACE ALL VALUES WITH YOUR OWN FROM FIREBASE CONSOLE

const firebaseConfig = {
 apiKey: "AIzaSyC-LQt9f3q73yAmKpyCuCuYbVqARZ984VU",
  authDomain: "marhaba-kids-wear.firebaseapp.com",
  databaseURL: "https://marhaba-kids-wear-default-rtdb.firebaseio.com",
  projectId: "marhaba-kids-wear",
  storageBucket: "marhaba-kids-wear.firebasestorage.app",
  messagingSenderId: "1048025467592",
  appId: "1:1048025467592:web:8ca02c4791b8f8ac0f73fd"
};

// ✅ Initialize Firebase (ONLY ONCE)
firebase.initializeApp(firebaseConfig);

// ✅ Realtime Database Reference
const database = firebase.database();
