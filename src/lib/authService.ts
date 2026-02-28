import {
  createUserWithEmailAndPassword,
  updateProfile,
  getIdToken,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { axiosPublic } from '@/lib/axios'
import uploadToImagebb from '@/lib/uploadToImagebb'

export interface RegisterParams {
  name: string
  email: string
  password: string
  imageFile: File
}

export interface RegisterResult {
  idToken: string
  name: string
  email: string
  image: string
  isNewUser: boolean
}

export async function registerUser({
  name,
  email,
  password,
  imageFile,
}: RegisterParams): Promise<RegisterResult> {
  const image = await uploadToImagebb(imageFile)

  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredential.user, { displayName: name, photoURL: image })

  // Get Firebase ID token — passed to NextAuth so it can create a session
  // without re-authenticating against Firebase a second time
  const idToken = await getIdToken(userCredential.user)

  const { data } = await axiosPublic.post<{ insertedId?: string }>('/users', { name, email })

  return {
    idToken,
    name,
    email,
    image,
    isNewUser: !!data.insertedId,
  }
}
