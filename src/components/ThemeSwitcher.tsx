import { useTheme } from 'src/hooks/useTheme'

export const ThemeSwitcher = () => {
  const { id, switchTheme } = useTheme()

  return <div onClick={switchTheme}>{id}</div>
}
