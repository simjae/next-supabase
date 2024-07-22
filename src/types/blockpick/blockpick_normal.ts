interface BlockpickNormal {
  id: number;
  blockpick_id: number;
  current_round: number;
  default_prize_amount: number;
  total_prize_amount: bigint;
  start_bp: number;
  round_up_bp: number;
  round_up_time: number;
  checkpoint_time: number;
  deleted_at?: Date;
  created_at: Date;
  created_user_id?: number;
  updated_at: Date;
  updated_user_id?: number;
}
