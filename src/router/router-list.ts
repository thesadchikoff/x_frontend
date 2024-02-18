import { ROUTES } from "@/constants";
import LoginScreen from "@/screens/auth/LoginScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import { CommunityScreen } from "@/screens/community/CommunityScreen";
import HomeScreen from "@/screens/home/HomeScreen";
import { Profile } from "@/screens/profile/Profile";
import { SettingsScreen } from "@/screens/settings/SettingsScreen";

export const RouterList = [
  {
    path: ROUTES.HOME,
    component: HomeScreen,
    isProtected: true,
  },
  {
    path: ROUTES.PROFILE,
    component: Profile,

    isProtected: true,
  },
  {
    path: ROUTES.SETTINGS,
    component: SettingsScreen,

    isProtected: true,
  },
  {
    path: ROUTES.COMMUNITY,
    component: CommunityScreen,

    isProtected: true,
  },
  {
    path: ROUTES.LOGIN,
    component: LoginScreen,

    isProtected: false,
  },
  {
    path: ROUTES.REGISTER,
    component: RegisterScreen,
    isProtected: false,
  },
];
