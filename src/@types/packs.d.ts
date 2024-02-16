interface Pack {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  preview: string;
}

interface Icon {
  id: string;
  path: string;
  created_at: string;
  pack_id: string;
}
