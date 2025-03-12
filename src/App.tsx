import { useState } from 'react';
import AddJournalForm from './components/AddJournalForm';
import Tabs from './components/Tabs';
import JournalList from './components/JournalList';

const App = () => {
   const [currentTab, setCurrentTab] = useState('add');

   const handleTab = (selectedTab: string) => {
      setCurrentTab(selectedTab);
   };

   return (
      <>
         <div className='mx-auto flex min-h-screen w-full max-w-3xl flex-col rounded-lg bg-gray-50 py-6 shadow-lg'>
            <div className='flex flex-col gap-3 rounded-xl bg-white p-6 shadow-md'>
               {/* Updated Header with Teal Gradient */}
               <header className='rounded-lg bg-gradient-to-r from-teal-700 to-teal-400 p-5 text-white shadow-md'>
                  <h1 className='mb-2 text-center text-3xl font-bold'>
                     My Journal
                  </h1>
                  <p className='text-center text-sm opacity-90'>
                     Capture your thoughts and emotions in one place.
                  </p>
               </header>

               {/* Tabs */}
               <Tabs onSelectTab={handleTab} />

               {/* Content */}
               <div className='flex flex-col gap-3 rounded-xl bg-gray-100 p-4 shadow-sm'>
                  {currentTab === 'add' ? <AddJournalForm /> : <JournalList />}
               </div>
            </div>
         </div>
      </>
   );
};

export default App;
