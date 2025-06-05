import { SearchInput } from './components/SearchInput';
import { UserList } from './components/UserList';
import { useSearchUsers } from './hooks/useSearchUsers';

function App() {
  const { loading, searchUsers } = useSearchUsers();

  const handleSearch = async (query: string) => {
    await searchUsers(query);
  };

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <SearchInput onSearch={handleSearch} loading={loading} />
        <UserList />
      </div>
    </div>
  );
}

export default App;
