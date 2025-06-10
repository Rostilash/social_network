import { useForm } from "react-hook-form";

export const AddMessageForm = ({ onSendMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onSendMessage(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea {...register("newMessage", { required: "Повідомлення обов’язкове" })} placeholder="Введіть своє повідомлення" />
        {errors.newMessage && <p style={{ color: "red" }}>{errors.newMessage.message}</p>}
      </div>
      <div>
        <button type="submit">Надіслати</button>
      </div>
    </form>
  );
};
