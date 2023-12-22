import { Outlet } from 'react-router-dom'
import 'i18next/config'
// import { useTranslation } from 'react-i18next'
import { Header } from 'components/header'

export default function Root() {
  // const { t } = useTranslation()

  // const changeLanguage = (language: string) => i18n.changeLanguage(language)

  return (
    <div className={'app'}>
      <Header/>

      <main>
        <Outlet/>
      </main>
    </div>
  )
}

