import { useTheme } from '../context/ThemeContext';

function FormInput({
  inputType,
  placeholder,
  id,
  register,
  registerValue,
  errors,
  callback,
  callbackArg,
  inputTypeTwo,
  callbackTwo,
  callbackArgTwo,
}) {
  const { isDarkMode } = useTheme();
  return (
    <>
      <div className='inputDiv'>
        <input
          type={inputType}
          id={id}
          placeholder={placeholder}
          {...register(registerValue)}
          onClick={() => {
            {
              callback && callback(callbackArg);
            }
          }}
          className={`inputClass ${
            isDarkMode ? 'text-slate-200' : 'text-slate-800'
          }`}
        />
        {inputTypeTwo && (
          <input
            type={inputTypeTwo}
            className='absolute right-2 top-2.5'
            onClick={() => {
              callbackTwo(callbackArgTwo);
            }}
          />
        )}

        <p className='errorPara'>{errors[registerValue]?.message}</p>
      </div>
    </>
  );
}
export default FormInput;
