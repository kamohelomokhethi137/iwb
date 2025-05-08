const CurrencyFormatter = ({ amount }) => {
    const formattedAmount = new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount);
  
    return <span>{formattedAmount}</span>;
  };
  
  export default CurrencyFormatter;