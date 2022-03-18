import { Cluster } from '../../models/cluster.interface';
import { createAction, props } from '@ngrx/store';
import { USER_REDUCER_ACTIONS } from 'src/app/models/cluster.interface';

export const setCluster = createAction(
  USER_REDUCER_ACTIONS.SetCluster,
  props<{ cluster: Cluster }>()
);

export const resetCluster = createAction(USER_REDUCER_ACTIONS.ResetCluster);
