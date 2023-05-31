import { ChangeEvent, useState } from 'react'

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('');
  }

  return {
    value,
    onChange,
    clear,
  }
}
