import 'i18next/config'
import { useTranslation } from 'react-i18next'


export default function Root() {
  const { t } = useTranslation()

  // const changeLanguage = (language: string) => i18n.changeLanguage(language)

  return (
    <div className={'app'}>
      <h1>{t('Hello world')}</h1>
    </div>
  )
}

