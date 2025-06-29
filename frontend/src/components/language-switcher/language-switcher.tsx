import { useTranslation } from 'react-i18next'
import { Select } from '@mantine/core'

interface LanguageSwitcherProps {
  position?: 'header' | 'footer' | 'navbar'
}

export const LanguageSwitcher = ({
  position = 'header',
}: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation()

  const changeLanguage = (language: string | null) => {
    if (language) {
      i18n.changeLanguage(language)
    }
  }

  const currentLanguage = ['en', 'pl'].includes(i18n.language)
    ? i18n.language
    : 'en'

  return (
    <Select
      label={
        position === 'header' || position === 'navbar'
          ? ''
          : t('languageSwitcher.language')
      }
      value={currentLanguage}
      onChange={changeLanguage}
      data={[
        { value: 'en', label: '🇬🇧 English' },
        { value: 'pl', label: '🇵🇱 Polski' },
      ]}
      size={position === 'header' ? 'xs' : 'sm'}
      radius="md"
      w={position === 'header' ? 100 : position === 'navbar' ? 140 : 'auto'}
      styles={() => ({
        input: {
          fontWeight: 500,
          paddingRight: '30px',
        },
        rightSection: {
          pointerEvents: 'none',
          width: '30px',
        },
        root: {
          flexGrow: position === 'navbar' ? 1 : 0,
        },
      })}
    />
  )
}
