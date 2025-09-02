import classNames from 'classnames';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Task, addTask } from 'store/slices/tasks';
import { AppDispatch } from 'store/store';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'ui/button/Button';

import styles from './CreateTaskForm.module.scss';

type FormValues = {
  title: string;
  description: string;
};

interface CreateTaskFormProps {
  onClose: () => void;
}

export const CreateTaskForm = ({ onClose }: CreateTaskFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { title, description } = data;

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      completed: false,
    };

    dispatch(addTask(newTask));
    reset();
    onClose();
  };

  const onError: SubmitErrorHandler<FormValues> = (error) => {
    console.log(error);
  };

  const inputClass = classNames(styles['form--input'], {
    [styles['form--input__error']]: errors?.title,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
      <label className={styles['form--label']}>
        Название задачи:
        <input
          {...register('title', {
            required: 'Название обязательно',
            minLength: { value: 6, message: 'Минимум 6 символов' },
            maxLength: { value: 50, message: 'Максимум 50 символов' },
          })}
          type="text"
          placeholder="Введите название задачи (от 6 до 50 символов)"
          className={inputClass}
        />
      </label>

      {errors?.title && (
        <p className={styles['form--error-message']}>{errors.title.message}</p>
      )}

      <label className={styles['form--label']}>
        Описание задачи:
        <textarea
          {...register('description', { required: false })}
          placeholder="Введите описание задачи (максимум 1000 символов)"
          className={styles['form--textarea']}
          maxLength={1000}
          rows={10}
        />
      </label>

      {errors?.description && <p>{errors.description.message}</p>}

      <Button
        label="Создать задачу"
        className={styles['form--submit']}
        type="submit"
        variant="secondary"
      />
    </form>
  );
};
