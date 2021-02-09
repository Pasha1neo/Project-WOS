import s from './FormsControls.module.css'
import {Field} from 'redux-form'

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '')}>
            <div>{children}</div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Input = (props) => {
    const {input, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...input} {...restProps} />
        </FormControl>
    )
}

export const Textarea = (props) => {
    const {input, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea {...restProps} {...input} />
        </FormControl>
    )
}
export const CreateField = (placeholder, name, validate, component, type, text) => {
    return (
        <>
            <Field
                placeholder={placeholder}
                name={name}
                validate={validate}
                component={component}
                type={type}
            />
            {text}
        </>
    )
}
