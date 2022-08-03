import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const errorToast = (errorMsg) => toast.error(errorMsg ?? 'Coś poszło nie tak.')
