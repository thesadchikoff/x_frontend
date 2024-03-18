import React, { useEffect, useState } from 'react'

type ThemeContextType = {
	theme: 'dark' | 'light'
	toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
	theme: 'dark',
	toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const storedTheme = localStorage.getItem('theme')
	const curentTheme = storedTheme ? (storedTheme as 'dark' | 'light') : 'dark'

	const [theme, setTheme] = useState(curentTheme)
	useEffect(() => {
		const html = document.querySelector('#main')
		if (theme === 'dark') {
			html?.classList.remove('light')
			html?.classList.add('dark')
		} else {
			html?.classList.remove('dark')
			html?.classList.add('light')
		}
	}, [theme])
	const toggleTheme = () => {
		setTheme(prevTheme => {
			const newTheme = prevTheme === 'light' ? 'dark' : 'light'
			localStorage.setItem('theme', newTheme)

			return newTheme
		})
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<main className={`${theme}  flex flex-col w-full h-full overflow-hidden`}>
				{children}
			</main>
		</ThemeContext.Provider>
	)
}
