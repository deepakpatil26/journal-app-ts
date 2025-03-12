import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
   title: z
      .string({ required_error: 'The journal title is required.' })
      .min(5, {
         message: 'The journal title must have at least 5 characters.',
      }),
   emotion: z
      .string({ required_error: 'Please specify how you are feeling today.' })
      .min(3, {
         message: 'The emotion field must have at least 3 characters.',
      }),
   body: z
      .string({ required_error: 'Please write something for this journal.' })
      .min(128, {
         message: 'Your journal must have at least 128 characters.',
      }),
});

type FormData = z.infer<typeof schema>;

const AddJournalForm = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<FormData>({ resolver: zodResolver(schema) });

   const onFormSubmit = (data: FieldValues) => {
      // Generate unique ID (fallback for browsers that don't support crypto.randomUUID)
      const uuid = crypto.randomUUID
         ? crypto.randomUUID()
         : Date.now().toString(36) + Math.random().toString(36).substr(2);

      data.id = uuid;

      // Add the current timestamp for the journal entry.
      data.createdAt = new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      });

      try {
         const storedJournals = localStorage.getItem('journals');
         const journalEntries = storedJournals
            ? JSON.parse(storedJournals)
            : [];

         journalEntries.push(data);
         localStorage.setItem('journals', JSON.stringify(journalEntries));

         openDialog();
         reset();
      } catch (error) {
         console.error('Failed to save journal:', error);
      }
   };

   const openDialog = () => {
      // document.getElementById('success_modal').showModal()
      const modal = document.getElementById('success_modal');
      if (modal instanceof HTMLDialogElement) {
         modal.showModal();
      }
   };

   return (
      <>
         <dialog
            id='success_modal'
            className='modal'>
            <div className='modal-box'>
               <h3 className='text-lg font-bold'>Successful!</h3>
               <p className='py-4'>The journal entry was successfully saved!</p>
               <div className='modal-action'>
                  <form method='dialog'>
                     {/* if there is a button in form, it will close the modal */}
                     <button className='btn'>Close</button>
                  </form>
               </div>
            </div>
         </dialog>
         <form
            className='flex flex-col gap-3'
            onSubmit={handleSubmit(onFormSubmit)}>
            <label className='input input-bordered flex items-center gap-2'>
               Journal Title
               <input
                  type='text'
                  className='grow'
                  placeholder='Give your journal entry a nice title'
                  {...register('title')}
               />
            </label>
            {errors.title && (
               <span className='-mt-3 font-medium text-red-500'>
                  {errors.title.message}
               </span>
            )}

            <div className='flex flex-col'>
               <label
                  htmlFor='emotions'
                  className='form-control w-full'>
                  How are you feeling today?
               </label>
               <select
                  id='emotions'
                  className='select select-bordered w-full'
                  {...register('emotion')}>
                  <option>😊 Happy</option>
                  <option>😐 Neutral</option>
                  <option>😢 Sad</option>
                  <option>🎉 Excited</option>
                  <option>🙏 Grateful</option>
                  <option>😠 Angry</option>
                  <option>😰 Stressed</option>
                  <option>😔 Lonely</option>
                  <option>💪 Motivated</option>
                  <option>😟 Anxious</option>
                  <option>😌 Proud</option>
                  <option>😌 Relaxed</option>
               </select>
               {errors.emotion && (
                  <span className='-mt-3 font-medium text-red-500'>
                     {errors.emotion.message}
                  </span>
               )}
            </div>

            <textarea
               className='textarea textarea-bordered'
               placeholder='Write something...'
               rows={10}
               {...register('body')}></textarea>
            {errors.body && (
               <span className='-mt-3 font-medium text-red-500'>
                  {errors.body.message}
               </span>
            )}

            <button className='btn bg-gradient-to-r from-teal-700 to-teal-500 text-white hover:opacity-90'>
               Save Journal
            </button>
         </form>
      </>
   );
};

export default AddJournalForm;
