const Helpers = require(__dirname + '/../Helpers/App')
const Moment = require('moment')

const Americano = (borrowed_capital, how_many_payments, interest, date_start, borrowed_type, borrowed_time) => {
    
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

    feeToPay = Helpers.parseDouble((capitalToLend * porcentaje))

    var quota = feeToPay
    let capitalInFor = 0
    let balance = capitalToLend

    let dateStart = Moment(date_start)
    for(let i = 0; i <numberOfCoutas; i++)
    {
        if(i == numberOfCoutas - 1)
        {
            quota = Helpers.parseDouble(capitalToLend) + feeToPay
            capitalInFor = capitalToLend
            balance = 0
            
        }
        let payment_date = null
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
                    .add(1, "year")
                    .format("YYYY-MM-DD");
            }
        } else {
            if (borrowed_type == "year" && how_many_payments == 12) {
              payment_date = dateStart.add(1, "month").format("YYYY-MM-DD");
            } else {
              payment_date = dateStart
                .add(idditionalDaysDateStart, "day")
                .format("YYYY-MM-DD");
            }
        }
        payments.push({
            number_of_quota: i + 1,
            payment_date: payment_date,
            fee_to_pay: Helpers.parseDouble(quota),
            capital: 	Helpers.parseDouble(capitalInFor),
            interest: 	Helpers.parseDouble(feeToPay),
            balance: 	Helpers.parseDouble(balance)
        })
    }
    return payments

}

module.exports = {
	Americano	
}