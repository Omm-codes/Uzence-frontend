import React, { useState } from 'react';
import styles from './InputField.module.css';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: string;
  name?: string;
  id?: string;
  clearable?: boolean;
  className?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  name,
  id,
  clearable = false,
  className = '',
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    const event = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange && onChange(event);
  };

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const inputClasses = [
    styles.input,
    styles[`input-${variant}`],
    styles[`input-${size}`],
    invalid ? styles.invalid : '',
    disabled ? styles.disabled : '',
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ');

  const containerClasses = [
    styles.container,
    styles[`container-${variant}`],
    styles[`container-${size}`],
    invalid ? styles.containerInvalid : '',
    disabled ? styles.containerDisabled : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.label} htmlFor={id || name}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        <input
          id={id || name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
          placeholder={placeholder}
          className={inputClasses}
          required={required}
          aria-invalid={invalid}
          aria-describedby={`${id || name}-helper ${id || name}-error`}
        />
        
        {loading && (
          <div className={styles.loadingIndicator}>
            <div className={styles.spinner}></div>
          </div>
        )}
        
        {clearable && value && !disabled && !loading && (
          <button 
            className={styles.clearButton} 
            onClick={handleClear}
            aria-label="Clear input"
            type="button"
          >
            ×
          </button>
        )}
        
        {isPassword && !disabled && !loading && (
          <button 
            className={styles.toggleButton} 
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
            type="button"
          >
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </button>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <div 
          className={`${styles.helperText} ${invalid ? styles.errorText : ''}`}
          id={`${id || name}-${invalid ? 'error' : 'helper'}`}
        >
          {invalid ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

export default InputField;
