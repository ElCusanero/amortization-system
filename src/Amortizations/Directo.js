const Helpers = require(__dirname + '/../Helpers/App')
const Moment = require('moment')

const Directo = (borrowed_capital, how_many_payments, interest, date_start, borrowed_type, borrowed_time) => {

    let idditionalDays = Helpers.borrowedTypeToDays(borrowed_type, borrowed_time)
    let idditionalDaysDateStart = (idditionalDays / how_many_payments)

    let capitalToLend = borrowed_capital
    let porcentaje = (interest / 100)
    let numberOfCoutas = how_many_payments
    let feeToPay = 0

    let payments = []

    feeToPay = Helpers.parseDouble((borrowed_capital / numberOfCoutas))
    let interestReal  = Helpers.parseDouble((capitalToLend * porcentaje))

    let previousBalance = Helpers.parseDouble((feeToPay * numberOfCoutas))

    let dateStart = Moment(date_start)
    let capitalTotal = 0
    for(let i = 0; i <numberOfCoutas; i++)
    {
        let balance = Helpers.parseDouble((previousBalance - feeToPay))
        let quota = Helpers.parseDouble((feeToPay + interestReal))
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
            fee_to_pay: quota,
            capital: feeToPay,
            interest: interestReal,
            balance: balance
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
	Directo	
}
