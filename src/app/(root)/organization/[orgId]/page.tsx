import CreateLinkForm from './_components/create-link-form';
import LinksList from './_components/links-list';

const Organization = () => {
  return (
    <div className='h-full w-full'>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex space-x-2 md:space-x-4'>
          <CreateLinkForm />
        </div>
        <LinksList />
      </div>
    </div>
  )
}

export default Organization;
