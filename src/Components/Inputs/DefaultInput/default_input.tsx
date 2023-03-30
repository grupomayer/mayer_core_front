import classNames from "classnames";
import { SelectDataType } from "Interfaces/SelectDataType";
import React, { memo } from "react";
import { Setter } from "Types/useState";
import styles from "./default_input.module.scss";

interface IDefaultInput {
  value: any,
  onChange: Setter<any>,
  type: "text" | "number" | "select" | "password" | "email" | "textarea" | "checkbox" | "date" | "file",
  placeholder: string,
  title: string,
  label: string,
  id: string,
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  disabled?: boolean,
  required?: boolean,
  className?: string,
  min?: number,
  max?: number,
  data?: Array<SelectDataType>
}
function DefaultInput({ id, className, onFocus, type, placeholder, title, label, min, max, value, onChange, data, disabled, required = true }: IDefaultInput) {

  function getDefaultClassNames(isSelect?: boolean): string {
    return classNames({
      [styles.holder__input]: true,
      [styles.holder__input__select]: isSelect === true
    })
  }

  return (
    <div className={classNames({
      [styles.holder]: true,
      [className ? className : ""]: true,
    })}>
      <label htmlFor={id} className={styles.holder__label}>
        {label}
      </label>
      {type !== "textarea" && type !== "select" && type !== "checkbox" && type !== "file" && (
        <input
          id={id}
          className={getDefaultClassNames()}
          placeholder={placeholder}
          type={type}
          title={title}
          min={min}
          max={max}
          minLength={min}
          maxLength={max}
          required={required}
          value={value}
          disabled={disabled}
          onFocus={onFocus}
          onChange={e => onChange ? onChange(e.target.value) : undefined}
        />
      )}
      {type === "file" && (
        <input
          id={id}
          className={getDefaultClassNames()}
          placeholder={placeholder}
          type={type}
          title={title}
          min={min}
          max={max}
          minLength={min}
          maxLength={max}
          required={required}
          disabled={disabled}
          onFocus={onFocus}
          onChange={e => onChange(e.target?.files?.length && e.target?.files?.length > 0 ? e.target?.files[0] : undefined) }
        />
      )}
      {type === "select" && (
        <select
          id={id}
          title={title}
          value={value}
          required={required}
          onFocus={onFocus}
          disabled={disabled}
          onChange={e => onChange ? onChange(e.target.value) : undefined}
          className={getDefaultClassNames(true)}
        >
          {data?.map(curOption => (
            <option value={curOption.value} key={curOption.value}>
              {curOption.label}
            </option>
          ))}
        </select>
      )}
      {type === "textarea" && (
        <textarea
          id={id}
          title={title}
          value={value}
          required={required}
          placeholder={placeholder}
          minLength={min}
          maxLength={max}
          disabled={disabled}
          onFocus={onFocus}
          onChange={e => onChange ? onChange(e.target.value) : undefined}
          className={classNames(getDefaultClassNames(), styles.textarea)}
        ></textarea>
      )}
      {type === "checkbox" && (
        <input
          type={type}
          id={id}
          className={getDefaultClassNames()}
          placeholder={placeholder}
          title={title}
          min={min}
          max={max}
          minLength={min}
          maxLength={max}
          required={required}
          checked={value}
          value={value}
          disabled={disabled}
          onFocus={onFocus}
          onChange={e => onChange(!value)}
        />
      )}
    </div>
  )
}

export default memo(DefaultInput);