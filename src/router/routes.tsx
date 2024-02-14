import { ROUTES } from '@/constants'
import { PrivateLayout, PublicLayout } from '@/layouts'

import LoginScreen from '@/screens/auth/LoginScreen'
import RegisterScreen from '@/screens/auth/RegisterScreen'
import { ErrorScreen } from '@/screens/error/ErrorScreen'
import HomeScreen from '@/screens/home/HomeScreen'
import { Profile } from '@/screens/profile/Profile'
import { SettingsScreen } from '@/screens/settings/SettingsScreen'

import { Navigate, RouteObject } from 'react-router-dom'

export const privateRoutes: RouteObject[] = [
	{
		path: ROUTES.HOME,
		element: <PrivateLayout />,
		// errorElement: <Navigate to={ROUTES.HOME} />,
		errorElement: <ErrorScreen />,
		children: [
			{
				index: true,
				element: <HomeScreen />,
			},
			{
				path: ROUTES.PROFILE,
				element: <Profile />,
			},
			{
				path: ROUTES.SETTINGS,
				element: <SettingsScreen />,
			},
		],
	},
]

export const publicRoutes: RouteObject[] = [
	{
		path: ROUTES.HOME,
		element: <PublicLayout />,
		errorElement: <Navigate to={ROUTES.LOGIN} />,
		children: [
			{
				index: true,
				element: <Navigate to={ROUTES.LOGIN} />,
			},
			{
				path: ROUTES.LOGIN,
				element: <LoginScreen />,
			},
			{
				path: ROUTES.REGISTER,
				element: <RegisterScreen />,
			},
		],
	},
]
