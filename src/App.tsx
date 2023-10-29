import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './Router';
import { Toaster } from 'sonner';
import SessionTimeoutModal from './components/SessionTimeoutModal';

function App() {
  return (
    <>
      <Toaster />
      <SessionTimeoutModal />
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
