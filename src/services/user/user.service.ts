import { api } from "@/api/instance";
import { AxiosError } from "axios";

class UserService {
  async login(requestData: AuthAndRegisterFormField | AxiosError) {
    const { data } = await api.post<AuthResponse>("/auth", requestData);
    return data;
  }
  async register(requestData: AuthAndRegisterFormField) {
    const { data } = await api.post("/auth/register", requestData);
    return data;
  }
  logout() {
    localStorage.removeItem("token");
  }
  async profile() {
    const { data } = await api.get<User>("/auth/profile");
    return data;
  }

  async uploadAvatar(file: any) {
    const { data } = await api.post(`/users/upload-avatar`, file);
    return data;
  }

  async updateProfile(requestData: UpdateUserField) {
    const { data } = await api.put<User>("/users/update", requestData);
    return data;
  }

  async changePassword(requestData: ChangePasswordFields) {
    const { data } = await api.post<User>(
      "/users/change-password",
      requestData
    );
    return data;
  }
}

export default new UserService();
