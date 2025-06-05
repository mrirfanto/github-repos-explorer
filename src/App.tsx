import { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { UserList } from './components/UserList';
import { useSearchUsers } from './hooks/useSearchUsers';
import type { GitHubUser } from './types/github';

function App() {
  const [query, setQuery] = useState('');
  const { loading, searchUsers, users } = useSearchUsers();

  const handleSearch = async (query: string) => {
    await searchUsers(query);
  };

  const handleSelectUser = (user: GitHubUser) => {
    console.log(user);
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
        <UserList
          users={users}
          onSelectUser={handleSelectUser}
          query={query}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
