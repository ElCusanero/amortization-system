const Helpers = require(__dirname + '/../Helpers/App')
const Moment = require('moment')

const Aleman = (borrowed_capital, how_many_payments, interest, date_start, borrowed_type, borrowed_time) => {
    
    /***
    CUOTA AMERICANA	= (V * I)
    CUOTA FINAL = (V + (V * I))
    ***/
    let idditionalDays = Helpers.borrowedTypeToDays(borrowed_type, borrowed_time)
    let idditionalDaysDateStart = (idditionalDays / how_many_payments)

    let capitalToLend = borrowed_capital
    let porcentaje = (interest / 100)
    let numberOfCoutas = how_many_payments
    let feeToPay = 0

    let payments = []

    feeToPay = Helpers.parseDouble((capitalToLend / numberOfCoutas))

    let previousBalance = Helpers.parseDouble((feeToPay * numberOfCoutas))

    let dateStart = Moment(date_start)
    let capitalTotal = 0
    for(let i = 0; i <numberOfCoutas; i++)
    {
        let interest  = Helpers.parseDouble((previousBalance * porcentaje))
        let quota = Helpers.parseDouble((feeToPay + interest))
        let balance = Helpers.parseDouble((previousBalance - feeToPay))
        let payment_date = null;

        if (how_many_payments == borrowed_time) {
            if (borrowed_type == "day") {
                payment_date = dateStart.add(1, "day").format("YYYY-MM-DD");
            }

            if (borrowed_type == "week") {
                payment_date = dateStart
                    .add(1, "week")
                    .format("YYYY-MM-DD");
            }

            if (borrowed_type == "month") {
                payment_date = dateStart
                    .add(1, "month")
                    .format("YYYY-MM-DD");
            }

            if (borrowed_type == "year") {
                payment_date = dateStart
                    .add(1, "month")
                    .format("YYYY-MM-DD");
            }
        } else {
            if (borrowed_type == "year") {
                payment_date = dateStart
                    .add(1, "month")
                    .format("YYYY-MM-DD");
            } else {
                payment_date = dateStart
                    .add(idditionalDaysDateStart, "days")
                    .format("YYYY-MM-DD");
            }
        }
        payments.push({
            number_of_quota: i + 1,
            payment_date: payment_date,
            fee_to_pay: Helpers.parseDouble(quota),
            capital: 	Helpers.parseDouble(feeToPay),
            interest: 	Helpers.parseDouble(interest),
            balance: 	Helpers.parseDouble(balance)
        })
        previousBalance = Helpers.parseDouble((previousBalance - feeToPay))
        capitalTotal = ( Helpers.parseDouble(capitalTotal) + Helpers.parseDouble(feeToPay) )
    }
    let borrowed_capital_calc = Helpers.parseDouble( ( Helpers.parseDouble(borrowed_capital) - Helpers.parseDouble(capitalTotal) ) )
    capitalTotal = borrowed_capital
    payments.map((row) => {
        if(row.number_of_quota == numberOfCoutas)
        {
            row.capital = Helpers.parseDouble((row.capital + (borrowed_capital_calc)))
            row.fee_to_pay = Helpers.parseDouble((row.capital + row.interest))
        }
        row.balance = Helpers.parseDouble((capitalTotal - row.capital))
        capitalTotal = row.balance
    })
    return payments

}

module.exports = {
	Aleman	
}