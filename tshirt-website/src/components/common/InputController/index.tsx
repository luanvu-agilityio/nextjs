'use client';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

// Components
import { Input, InputProps } from '@/components';

interface InputControllerProps<T extends FieldValues>
  extends Omit<InputProps, 'onChange' | 'value'> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  className?: string;
}

function InputController<T extends FieldValues>({
  name,
  control,
  rules,
  className,
  ...inputProps
}: Readonly<InputControllerProps<T>>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Input
          {...inputProps}
          {...field}
          error={fieldState.error?.message}
          className={className}
        />
      )}
    />
  );
}
export { InputController };
