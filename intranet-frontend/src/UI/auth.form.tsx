import { Link } from 'react-router-dom';
import { AuthFormProps } from '../models/prop.model';
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";

export default function AuthForm({
  title,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkTo,
  formData,
  fieldErrors,
  error,
  success,
  handleChange,
  handleSubmit,
}: AuthFormProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-gray-900 tracking-tight">{title}</h2>
          <div className="mt-2 w-16 h-0.5 bg-gray-200 mx-auto"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <div className="relative">
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder=" "
                className={`w-full px-4 py-3 text-sm border-b focus:border-b-2 bg-transparent focus:outline-none peer ${
                  fieldErrors.username
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-300 focus:border-gray-800'
                }`}
                required
              />
              <label
                htmlFor="username"
                className={`absolute left-0 top-0 px-4 py-3 text-sm transition-all duration-200 transform pointer-events-none
                  ${formData.username
                    ? '-translate-y-4 text-xs text-gray-600'
                    : 'peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-gray-600 text-gray-500'
                  }`
                }
              >
                Usuario
              </label>
            </div>
            {fieldErrors.username && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {fieldErrors.username}
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                className={`w-full px-4 py-3 text-sm border-b focus:border-b-2 bg-transparent focus:outline-none peer ${
                  fieldErrors.password
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-gray-300 focus:border-gray-800'
                }`}
                required
              />
              <label
                htmlFor="username"
                className={`absolute left-0 top-0 px-4 py-3 text-sm transition-all duration-200 transform pointer-events-none
                  ${formData.password
                    ? '-translate-y-4 text-xs text-gray-600'
                    : 'peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-gray-600 text-gray-500'
                  }`
                }
              >
                Contraseña
              </label>
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 text-xs mt-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {fieldErrors.password}
              </p>
            )}
          </div>

          <div className="h-10 transition-all duration-300">
            {error && (
            <div className="text-red-500 text-xs py-2 px-4 bg-red-50 rounded-lg flex items-center">
              <MdError className="mr-1 text-base" />
              <span>{error}</span>
            </div>
            )}

            {success && (
            <div className="text-green-600 text-xs py-2 px-4 bg-green-50 rounded-lg flex items-center">
              <FaCheck className="mr-1" />
              <span>{success}</span>
            </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 text-sm font-medium border-2 border-black text-white bg-gray-900 rounded-lg transition-all duration-200 hover:bg-white hover:text-black hover:-translate-y-[1px] focus:outline-none"
          >
            {buttonText}
          </button>

          <p className="text-xs text-center text-gray-500 pt-3">
            {footerText}{' '}
            <Link to={footerLinkTo} className="text-gray-700 hover:text-gray-900 font-medium underline underline-offset-2">
              {footerLinkText}
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}