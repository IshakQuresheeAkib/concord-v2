import type { InputHTMLAttributes, ReactNode, Ref, JSX } from 'react'
import './input-field.css'

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'placeholder'> {
  label: string
  endAdornment?: ReactNode
  variant?: 'default' | 'dark'
  ref?: Ref<HTMLInputElement>
}

export default function InputField({
  label,
  endAdornment,
  variant = 'default',
  ref,
  ...props
}: InputFieldProps): JSX.Element {
  return (
    <div className={`input-effect${variant === 'dark' ? ' variant-dark' : ''}`}>
      <input
        ref={ref}
        {...props}
        className="effect-input"
        placeholder=" "
        style={endAdornment ? { paddingRight: '2.5rem' } : undefined}
      />
      <label className="input-label">{label}</label>
      <span className="focus-border">
        <i />
      </span>
      {endAdornment && (
        <span className="input-end-adornment">{endAdornment}</span>
      )}
    </div>
  )
}
