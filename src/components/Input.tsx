import classNames from 'classnames'
import { ComponentProps, forwardRef, useId } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

type InputProps = ComponentProps<'input'> & {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const id = useId()
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            id={id}
            ref={ref}
            className={classNames(
              'block w-full rounded-md border-0 p-2 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 outline-none',
              {
                'pr-10 text-red-900 ring-red-300 placeholder:text-red-300':
                  error,
              }
            )}
            {...props}
          />
          {Boolean(error) && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {Boolean(error) && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)
