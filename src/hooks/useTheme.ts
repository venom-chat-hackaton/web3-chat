import { useContext } from 'react'
import { ThemeContext } from 'src/services/providers/Theme'

export const useTheme = () => useContext(ThemeContext)
