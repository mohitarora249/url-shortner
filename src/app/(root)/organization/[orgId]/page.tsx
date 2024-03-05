import CreateLinkForm from "./_components/create-link-form";
import LinksList from "./_components/links-list";

const Organization = () => {
  return (
    <div className="h-full w-full">
      <div className="mx-auto max-w-screen-lg">
        <div className="flex space-x-2 md:space-x-4">
          <CreateLinkForm />
        </div>
        <LinksList />
      </div>
    </div>
  );
};

export default Organization;
