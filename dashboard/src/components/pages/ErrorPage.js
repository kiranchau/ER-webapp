import { useRouteError } from 'react-router-dom';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'working in Progress';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className='w-100 d-flex justify-content-center align-items-center'>
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;