const EmptyState = () => {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mt-2">
          Select a chat or start the new Conversation 
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
