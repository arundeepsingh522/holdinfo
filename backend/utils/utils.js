
const calculatePercentageDifference = (sell,buy)=>
{
  if(buy==0 || sell ==0)
  {
    return 0;
  }else
  {
    return (((sell-buy)/buy)*100).toFixed(2);
  }
  
}

const formatCurrencyPair=(pair)=> {
  if (!pair) return '';
  
  return pair
    .split('/') // Split the string into two parts: ["BTC", "INR"]
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) // Capitalize the first letter of each part
    .join('/'); // Join the parts back with a "/"
}




module.exports = {
  calculatePercentageDifference,
  formatCurrencyPair
};
