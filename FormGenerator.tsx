import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormSchema } from './FormSchema';

interface FormGeneratorProps {
  schema: FormSchema;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { handleSubmit, control, watch, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold">{schema.formTitle}</h2>
      <p>{schema.formDescription}</p>

      {schema.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label htmlFor={field.id} className="block text-sm font-bold">
            {field.label} {field.required && '*'}
          </label>

          {field.type === 'text' || field.type === 'email' ? (
            <Controller
              name={field.id}
              control={control}
              rules={{
                required: field.required ? 'This field is required' : false,
                pattern: field.validation?.pattern
                  ? { value: new RegExp(field.validation.pattern), message: field.validation.message }
                  : undefined,
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={value || ''}
                  onChange={onChange}
                  className="border p-2 w-full"
                />
              )}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.id}
              className="border p-2 w-full"
              {...control.register(field.id, { required: field.required })}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : null}

          {errors[field.id] && <p className="text-red-500">{errors[field.id]?.message}</p>}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default FormGenerator;
