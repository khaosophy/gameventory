import PropTypes from 'prop-types';

export default function InputField(props) {
  const { 
    type =' text',
    visuallyHidden = true,
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
        className="form-control mb-3"
        placeholder={props.placeholder || props.label}
        value={props.value}
        onChange={props.onChange}
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
  ]),
  visuallyHidden: PropTypes.bool,
}