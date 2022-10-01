import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import authService from '../api/services/auth.service'
import { logout } from '../actions/auth'
import { Button } from 'react-bootstrap'

export const errorToast = (errorMsg) => toast.error(errorMsg ?? 'Coś poszło nie tak.')

const refreshSession = (user, dispatch, navigate) => {
  authService.refreshToken(user.refresh_token).catch(() => dispatch(logout(navigate)))
}
export const refreshSessionToast = (user, dispatch, navigate) =>
  toast.warning(
    <div className={'d-flex flex-column'}>
      <p className={'text-center'}>Twoja sesja wygaśnie za mniej niż 15min.</p>
      <Button variant={'outline-warning'} onClick={() => refreshSession(user, dispatch, navigate)}>
        Wydłuż sesję
      </Button>
    </div>,
    {
      autoClose: false,
      theme: 'dark'
    }
  )

export const successToast = (successMsg) => toast.success(successMsg ?? 'Zmiany dokonane pomyślnie.', { theme: 'dark' })
