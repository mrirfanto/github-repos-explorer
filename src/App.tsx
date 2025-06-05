import { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { UserList } from './components/UserList';
import { useSearchUsers } from './hooks/useSearchUsers';

function App() {
  const [query, setQuery] = useState('');
  const { loading, searchUsers, users } = useSearchUsers();

  const handleSearch = async (query: string) => {
    await searchUsers(query);
  };

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <SearchInput
          onSearch={handleSearch}
          loading={loading}
          query={query}
          onSetQuery={setQuery}
        />
        <UserList users={users} query={query} loading={loading} />
      </div>
    </div>
  );
}

export default App;
