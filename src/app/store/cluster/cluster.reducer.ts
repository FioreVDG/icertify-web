import { Cluster } from './../../models/cluster.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';
import { resetCluster, setCluster } from './cluster';

const clusterInitialState: Cluster = {
  _id: '',
  name: '',
  barangays: [],
  _notaryId: '',
  day: {},
  _riders: '',
  status: '',
};

const setclusterReducer = on(
  setCluster,
  (state: Cluster | unknown, props: { cluster: Cluster }) => {
    return { ...(state as Cluster), ...props.cluster };
  }
);

const resetCluterReducer = on(resetCluster, (state: Cluster | unknown) => {
  return { ...clusterInitialState };
});

const _clusterReducer = createReducer(
  clusterInitialState,
  setclusterReducer,
  resetCluterReducer
);

export const clusterReducer = (state: User | unknown, action: Action) =>
  _clusterReducer(state, action);
