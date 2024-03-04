import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QUERYE_KEYS } from './constants'
import { UserProvider } from './contexts'
import { OnlyAuth, OnlyUnAuth } from './hoc/ProtectedRouter'
import { useThemeContext } from './hooks/useThemeContext'
import { PrivateLayout, PublicLayout } from './layouts'
import { ThemeProvider } from './providers/ThemeProvider'
import { RouterList } from './router/router-list'
import { ErrorScreen } from './screens/error/ErrorScreen'
import { LoadingScreen } from './screens/loading/LoadingScreen'
import userService from './services/user/user.service'

function App() {
	const [user, setUser] = useState<User | null>(null)
	const { data, isError, isLoading, isSuccess } = useQuery({
		queryKey: [QUERYE_KEYS.GET_PROFILE],
		queryFn: userService.profile,
		retry: false,
		refetchOnWindowFocus: true,
		refetchOnMount: false,
		refetchOnReconnect: false,
	})
	const { theme } = useThemeContext()
	useEffect(() => {
		if (isSuccess) {
			setUser(data)
		}
		if (isError) {
			setUser(null)
		}
	}, [data, isSuccess, isError])
	if (isLoading) {
		return <LoadingScreen />
	}
	return (
		<>
			<UserProvider user={user} setUser={setUser}>
				<ThemeProvider>
					<Toaster style={{ zIndex: 1000 }} />
					<BrowserRouter>
						<Routes>
							{RouterList.map(route => {
								if (route.isProtected) {
									return (
										<Route
											key={route.path}
											path={route.path}
											errorElement={<ErrorScreen />}
											element={
												<OnlyAuth
													component={
														<PrivateLayout>
															<route.component />
														</PrivateLayout>
													}
												/>
											}
										/>
									)
								}
								return (
									<Route
										key={route.path}
										path={route.path}
										errorElement={<ErrorScreen />}
										element={
											<OnlyUnAuth
												component={
													<PublicLayout>
														<route.component />
													</PublicLayout>
												}
											/>
										}
									/>
								)
							})}
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</UserProvider>
		</>
	)
}

export default App
