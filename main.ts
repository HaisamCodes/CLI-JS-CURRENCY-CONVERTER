import inquirer from "inquirer";
interface CurrencyRate{
  [key:string] : number
}

const currencyRate : CurrencyRate = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.79,
  JPY: 142.62,
  PKR: 279.49,
  INR: 83.33,
  CAD: 1.32,
  AUD: 1.47,
  NZD: 1.58,
}

const currencyConverter = async () => {
  const questions = await inquirer.prompt([
    {
      type : "list",
      name : "currency",
      message : "Select the Base currency",
      choices : Object.keys(currencyRate)
    },
    {
      type : "input",
      name: "amount",
      message : "Enter the amount you want to Convert",
      validate : (value : string) =>{
        if(isNaN(Number(value))){
          return "Please enter a valid amount"
        }
        return true ;
      }

    },
    {
      type : "list",
      name: "convertTo",
      message : "Select the target currency",
      choices : Object.keys(currencyRate)
    }


  ])
  
  const {currency, amount, convertTo} = questions ;
  const convertedAmount = 
   (currencyRate[convertTo] / currencyRate[currency]) * Number(amount) 
  
  console.log(`${amount} ${currency} = ${convertedAmount.toFixed(2)} ${convertTo} `)

 };
 
 const main = async () => {
  let again;
  do{ 
    await currencyConverter() ;
    const response = await inquirer.prompt([
    {
      type : "confirm",
      name : "again",
      message: "Convert again"
    }
    ]);
    again = response.again
    if(!again){
      console.log("Thank you for using Currency Converter");
      
    }

  } while (again)
  
 }
main()
