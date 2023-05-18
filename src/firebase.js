// Import the functions you need from the SDKs you need
import { ref, onMounted, onUnmounted } from 'vue'
import { initializeApp } from 'firebase/app'
import {
  RecaptchaVerifier,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut
} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
// auth.languageCode = 'pt'

export const useAuth = () => {
  const user = ref(null)

  let unsubscribe
  onMounted(async () => {
    unsubscribe = onAuthStateChanged(
      auth,
      u => (user.value = u),
      e => (user.value = e)
    )
  })

  onUnmounted(() => unsubscribe())

  const setRecatcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function (response) {
          console.log('Captcha Resolved')
          this.onSignInSubmit()
        },
        defaultCountry: 'PT'
      },
      auth
    )
  }

  const loginWithPhoneNumber = phoneNumber => {
    setRecatcha()
    const appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, '+55' + phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult
      })
      .catch(error => {
        console.log(error)
      })
  }

  const verificationCode = code => {
    window.confirmationResult
      .confirm(code)
      .then(result => {
        // User signed in successfully.
        // ...
        console.log('LoggedIn')
      })
      .catch(error => {
        // User couldn't sign in (bad verification code?)
        console.log(error)
      })
  }
  const logout = async () => signOut(auth)

  return { user, loginWithPhoneNumber, logout, verificationCode }
}
