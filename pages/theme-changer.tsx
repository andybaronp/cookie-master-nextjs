import { ChangeEvent, useState, useEffect, FC } from 'react'
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import Layout from '../components/layouts/Layout'
import Cookies from 'js-cookie'
import axios from 'axios'

interface Props {
  theme: string
}
const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme)

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value
    console.log(selectedTheme)
    setCurrentTheme(selectedTheme)
    Cookies.set('theme', selectedTheme)
  }

  const onclick = async () => {
    const { data } = await axios.get('/api/hello')
    console.log(data)
  }
  useEffect(() => {
    setCurrentTheme(theme)
  }, [theme])

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onChangeTheme}>
              <FormControlLabel
                value='ligth'
                control={<Radio />}
                label='ligth'
              />
              <FormControlLabel value='dark' control={<Radio />} label='Dark' />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
        <Button onClick={onclick}>Petición</Button>
      </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'ligth', name = 'No name' } = req.cookies
  const validThemes = ['ligth', 'dark', 'custom']
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
      name,
    },
  }
}

export default ThemeChangerPage
