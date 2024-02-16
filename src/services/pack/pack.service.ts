import { api } from "@/api/instance";

class StatusPack {
  async getAllPacks() {
    const { data } = await api.get<Pack[]>("/status-icons");
    return data;
  }

  async getIconsByPackId(id: string) {
    console.log(id);
    const { data } = await api.get<Icon[]>(`/status-icons/${id}`);
    return data;
  }

  async uploadIconForUser(id: string) {
    const { data } = await api.patch(`/status-icons/${id}`);
    return data;
  }
}

export default new StatusPack();
