import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'
import { darkTheme, customTheme, lightTheme } from '../themes'
import { CssBaseline, Theme } from '@mui/material'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'

interface Props extends AppProps {
  theme: string
}
function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookiesTheme = Cookies.get('theme') || 'ligth'
    const selectTheme: Theme =
      cookiesTheme === 'ligth'
        ? lightTheme
        : cookiesTheme === 'dark'
        ? darkTheme
        : customTheme
    setCurrentTheme(selectTheme)
  }, [])
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { theme } = appContext.ctx.req
//     ? (appContext.ctx.req as any).cookies
//     : { theme: 'dark' }
//   const validThemes = ['ligth', 'dark', 'custom']
//   return {
//     theme: validThemes.includes(theme) ? theme : 'dark',
//   }
// }
export default MyApp
