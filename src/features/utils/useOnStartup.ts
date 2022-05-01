import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { getInvitesRequest } from '../invites/slice';
import { getAccountRequest } from '../balance/silce';

const useOnStartUp = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(
    (state: RootState) => !!state.auth?.profile?.id,
  );
  const updateInvitesSyncActionTime = useAppSelector(
    (state: RootState) => state.sync.invitesSyncActionTime,
  );

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getInvitesRequest());
      dispatch(getAccountRequest());
    }
  }, [isAuthorized, updateInvitesSyncActionTime]);
};

export default useOnStartUp;
