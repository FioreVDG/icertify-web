export interface Cluster {
  _id: string;
  name: string;
  day: object;
  barangays: Array<Cluster_Barangay>;
  _notaryId: string;
  _riders: string;
  status: string;
}

export interface Cluster_Barangay {
  _barangay: {
    brgyCode: string;
    brgyDesc: string;
    citymunCode: string;
    id: string;
    provCode: string;
    regCode: string;
    _id: string;
  };
  minDoc: number;
  maxDoc: number;
  duration: number; //seconds
}

export enum USER_REDUCER_ACTIONS {
  SetCluster = 'SET_CLUSTER',
  ResetCluster = 'RESET_CLUSTER',
}
