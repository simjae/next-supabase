type BlockpickType = "NORMAL" | "OFFLINE";
type BlockpickStatus = "ACTIVE" | "INACTIVE" | "COMPLETED";

interface Blockpick {
  id: number;
  type: BlockpickType;
  title: string;
  content?: string;
  depth1_side_size: number;
  depth2_side_size?: number;
  depth3_side_size?: number;
  depth4_side_size?: number;
  total_block_count: number;
  open_at: Date;
  start_at: Date;
  end_at: Date;
  status: BlockpickStatus;
  deleted_at?: Date;
  created_at: Date;
  created_user_id?: number;
  updated_at: Date;
  updated_user_id?: number;
}
