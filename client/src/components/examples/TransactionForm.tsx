import TransactionForm from '../TransactionForm';

export default function TransactionFormExample() {
  const handleSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <div className="flex flex-wrap gap-4 p-6">
      <TransactionForm 
        type="purchase" 
        onSubmit={handleSubmit}
      />
      <TransactionForm 
        type="sale" 
        onSubmit={handleSubmit}
      />
      <TransactionForm 
        type="cash-in" 
        onSubmit={handleSubmit}
      />
      <TransactionForm 
        type="cash-out" 
        onSubmit={handleSubmit}
      />
    </div>
  );
}