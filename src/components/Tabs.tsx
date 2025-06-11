import { useState } from 'react';

interface Props {
  onSelectTab: (tab: string) => void;
}

const Tabs = ({ onSelectTab }: Props) => {
  const [selectedTab, setSelectedTab] = useState('add');

  const handleToggleTab = (selectedTab: string) => {
    setSelectedTab(selectedTab);
    onSelectTab(selectedTab);
  };

  return (
    <div className='flex flex-col justify-center gap-2 sm:flex-row sm:gap-4'>
      <button
        className={`rounded-md px-4 py-2 text-lg font-medium transition duration-300 ${
          selectedTab === 'add'
            ? 'bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-lg'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
        onClick={() => handleToggleTab('add')}>
        ✍️ Add Entry
      </button>
      <button
        className={`rounded-md px-4 py-2 text-lg font-medium transition duration-300 ${
          selectedTab === 'entries'
            ? 'bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-lg'
            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
        }`}
        onClick={() => handleToggleTab('entries')}>
        📖 Entries
      </button>
    </div>
  );
};

export default Tabs;
