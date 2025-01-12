interface InputProps {
  ref?: any;
  placeHolder: string;
}

export function Input({ placeHolder, ref }: InputProps) {
  return (
    <div>
      <input
        type={"text"}
        ref={ref}
        className="px-4 py-2 border-gray-200 rounded-lg bg-gray-200 my-2"
        placeholder={placeHolder}
      />
    </div>
  );
}
