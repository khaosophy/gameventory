import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function InputField(props) {
  const { 
    type =' text',
    visuallyHidden = true,
    disableMargin = false,
  } = props;

  return (
    <>
      <label 
        htmlFor={props.id}
        className={visuallyHidden ? 'visually-hidden' : 'form-label'}
      >
        {props.label}
        </label>
      <input
        id={props.id}
        type={type}
        className={classNames('form-control', { 'mb-3': !disableMargin })}
        placeholder={props.placeholder || props.label}
        value={props.value}
        onChange={props.onChange}
        autoComplete={props.autoComplete}
      />
    </>
  )
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'tel',
    'number',
    'email',
    'password',
  ]),
  autoComplete: PropTypes.string,
  visuallyHidden: PropTypes.bool,
  // consider changing disableMargin to something more contextual, like `isInputGroup`
  disableMargin: PropTypes.bool,
}