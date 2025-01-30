type Props = {
  message?: string;
};

const NotFound = ({ message }: Props) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl lg:text-6xl">
          404
        </h1>
        <p className="text-lg">Oops! Page Not Found</p>
        {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default NotFound;
