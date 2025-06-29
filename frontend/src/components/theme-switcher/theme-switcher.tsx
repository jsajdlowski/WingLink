import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const ThemeSwitcher = () => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light')
  const { t } = useTranslation()

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark')
  }

  const tooltipLabel =
    computedColorScheme === 'dark'
      ? t('themeSwitcher.light')
      : t('themeSwitcher.dark')

  return (
    <Tooltip label={tooltipLabel} withArrow position="bottom">
      <ActionIcon
        onClick={toggleColorScheme}
        variant="light"
        size="lg"
        radius="md"
        color={computedColorScheme === 'dark' ? 'yellow' : 'blue'}
        aria-label={t('themeSwitcher.toggle')}
      >
        {computedColorScheme === 'dark' ? (
          <IconSun size="1.2rem" stroke={1.5} />
        ) : (
          <IconMoon size="1.2rem" stroke={1.5} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}
