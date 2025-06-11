import { useEffect, useState } from 'react';
import { ImHappy2, ImNeutral2, ImSad2 } from 'react-icons/im';

const JournalList = () => {
  const [journals, setJournals] = useState<
    {
      id: string;
      title: string;
      emotion: string;
      body: string;
      createdAt: string;
    }[]
  >([]);
  const [journal, setJournal] = useState<{
    id: string;
    title: string;
    emotion: string;
    body: string;
    createdAt: string;
  } | null>(null);

  useEffect(() => {
    const storedJournals = localStorage.getItem('journals');
    if (storedJournals) {
      setJournals(JSON.parse(storedJournals));
    }
  }, []);

  const onViewJournal = (entry: typeof journal) => {
    setJournal(entry);
  };

  const closeJournal = () => {
    setJournal(null);
  };

  const deleteJournal = (id: string) => {
    setJournals((prevJournals) => {
      const updatedJournals = prevJournals.filter(
        (journal) => journal.id !== id
      );
      localStorage.setItem('journals', JSON.stringify(updatedJournals));
      return updatedJournals;
    });
    closeJournal();
  };

  return (
    <>
      {journals.length > 0 && !journal && (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {journals.map((entry) => (
            <div
              className='rounded-lg bg-white p-4 transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer hover:shadow-xl'
              key={entry.id}
              onClick={() => onViewJournal(entry)}>
              <h3 className='mb-2 font-playfair text-xl font-bold'>
                {entry.title}
              </h3>
              <h4>Created at {entry.createdAt}</h4>
            </div>
          ))}
        </div>
      )}

      {journals.length === 0 && (
        <div className='w-full rounded-xl bg-white p-3 text-center font-medium'>
          There are no published journals yet.
        </div>
      )}

      {journal && (
        <div className='relative flex max-h-[640px] w-full flex-col overflow-y-scroll rounded-xl bg-white p-4 sm:w-2/3 sm:p-8'>
          {journal.emotion === 'Sad' ? (
            <ImSad2 className='absolute -right-2 top-3 z-0 h-12 w-12 text-gray-200 sm:-right-8 sm:top-0 sm:h-32 sm:w-32' />
          ) : journal.emotion === 'Happy' ? (
            <ImHappy2 className='absolute -right-2 top-3 z-0 h-12 w-12 text-gray-200 sm:-right-8 sm:top-0 sm:h-32 sm:w-32' />
          ) : (
            <ImNeutral2 className='absolute -right-2 top-3 z-0 h-12 w-12 text-gray-200 sm:-right-8 sm:top-0 sm:h-32 sm:w-32' />
          )}
          <h2 className='z-10 mb-2 font-playfair text-4xl font-bold'>
            {journal.title}
          </h2>
          <h3 className='mb-4 text-gray-500'>Created at {journal.createdAt}</h3>
          <p>{journal.body}</p>
          <div className='flex justify-between gap-2'>
            <button
              className='btn mt-2 flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white hover:opacity-90'
              onClick={() => deleteJournal(journal.id)}>
              Delete
            </button>
            <button
              className='btn btn-secondary mt-2 flex-1 bg-gradient-to-r from-teal-700 to-teal-500 text-white hover:opacity-90'
              onClick={closeJournal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JournalList;
