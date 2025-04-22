interface InputProps {
  ref?: any;
  placeHolder: string;
  required?:any;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export function Input({ placeHolder, ref, required, type, value, onChange }: InputProps) {
  return (
    <div>
      <input
        type={type||"text"}
        ref={ref}
        className="px-4 py-2 border-gray-200 rounded-lg bg-gray-200 my-2"
        placeholder={placeHolder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
