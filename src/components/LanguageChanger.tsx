import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { languages } from 'src/assets/translations'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

export const LanguageChanger = () => {
  const [cache, setCache] = useLocalStorage('LANG', 'en')
  const { i18n } = useTranslation()
  const { changeLanguage } = i18n

  const onChangeLanguage = (value: string) => {
    changeLanguage(value)
    setCache(value)
  }

  return (
    <Select
      onChange={onChangeLanguage}
      options={languages.map((l) => ({ label: l, value: l }))}
      defaultValue={cache}
    />
  )
}
