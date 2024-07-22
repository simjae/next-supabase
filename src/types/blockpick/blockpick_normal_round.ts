interface BlockpickNormalRound {
  id: number;
  blockpick_normal_id: number;
  round: number;
  bp: number;
  round_pick_count: number;
  round_prize_amount: number;
  round_start_at: Date;
  round_end_at?: Date;
  deleted_at?: Date;
  created_at: Date;
  created_user_id?: number;
  updated_at: Date;
  updated_user_id?: number;
}
