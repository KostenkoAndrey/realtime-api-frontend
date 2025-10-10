import { AppDispatch } from '@/redux/store';
import { authenticateWithGoogleThunk } from '@/redux/auth/operations';

interface LoadingState {
  login: boolean;
  google: boolean;
  isRedirecting: boolean;
}

export const authenticateWithGoogle = async (
  dispatch: AppDispatch,
  setLoading: React.Dispatch<React.SetStateAction<LoadingState>>,
) => {
  try {
    setLoading((prev) => ({ ...prev, google: true }));
    const resultAction = await dispatch(authenticateWithGoogleThunk());
    if (authenticateWithGoogleThunk.fulfilled.match(resultAction)) {
      const googleUrl = resultAction.payload;
      if (googleUrl) {
        setLoading((prev) => ({ ...prev, isRedirecting: true }));
        window.location.href = googleUrl;
      }
    }
  } catch {
    setLoading((prev) => ({ ...prev, google: false }));
  } finally {
    setLoading((prev) => ({ ...prev, google: false }));
  }
};
