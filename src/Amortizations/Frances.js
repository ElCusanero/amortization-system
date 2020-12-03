const Helpers = require(__dirname + '/../Helpers/App')
const Moment = require('moment')

const Frances = (borrowed_capital, how_many_payments, interest, date_start, borrowed_type, borrowed_time) => {
    
    /***
						  		( I (( 1 + I )  ˄ N))
		CUOTA FRANCES = V * ----------------------------
								((( 1 + I )  ˄ N) - 1)
		***/

		/******
		INTERES FRANCES = I * V
		***/

		let idditionalDays 			= Helpers.borrowedTypeToDays(borrowed_type, borrowed_time)
		let idditionalDaysDateStart = (idditionalDays / how_many_payments)
		idditionalDaysDateStart  	= Math.trunc(idditionalDaysDateStart)

		let capitalToLend 	= borrowed_capital
		let porcentaje 		= (interest / 100)
		let numberOfCoutas 	= how_many_payments

		let feeToPay = 0
		let payments = []

		let more_one_interest 		= (1 + porcentaje) 
		let pow_more_one_interest 	= Math.pow(more_one_interest, numberOfCoutas)
		let line1 					= (porcentaje * pow_more_one_interest)
		let line2 					= (pow_more_one_interest - 1)
		let divicion 				= (line1 / line2)

		feeToPay = Helpers.parseDouble(capitalToLend * divicion)

		let previousBalance = capitalToLend
		let dateStart = Moment(date_start)
		let capitalTotal = 0

		for(let i = 0; i <numberOfCoutas; i++)
		{

			let interest = Helpers.parseDouble(previousBalance * porcentaje);

			let capital = Helpers.parseDouble(feeToPay - interest);

			let balance = Helpers.parseDouble(previousBalance - capital);
			
			let payment_date = null

			if (how_many_payments == borrowed_time) 
			{
				if (borrowed_type == "day") {
					payment_date = dateStart
									.add(1, "day")
									.format("YYYY-MM-DD");
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
			}
			else
			{
				if (borrowed_type == "year" && how_many_payments == 12)
				{
					payment_date = dateStart
						.add(1, "month")
						.format("YYYY-MM-DD");
				}
				else
				{
					payment_date = dateStart
						.add(idditionalDaysDateStart, "day")
						.format("YYYY-MM-DD");
				}
			}

			payments.push({
				number_of_quota: ( i + 1 ),
				payment_date: payment_date,
				fee_to_pay: feeToPay,
				capital: capital,
				interest: interest,
				balance: balance,
			});

			previousBalance = balance
			capitalTotal = Helpers.parseDouble(capitalTotal + capital)

		}

		let last_payment = payments[payments.length - 1]

		if(last_payment.balance > 0)
		{
			last_payment.capital 	= Helpers.parseDouble((last_payment.capital + last_payment.balance))
			last_payment.fee_to_pay = Helpers.parseDouble((last_payment.capital + last_payment.interest))
			last_payment.balance 	= Helpers.parseDouble((payments[payments.length - 2].balance - last_payment.capital))
		}
		
		if(last_payment.balance < 0)
		{
			
			let media_quote = payments.filter((row) => row.balance < 0).length

			if(media_quote == 1)
			{
				last_payment.capital 	= Helpers.parseDouble((last_payment.capital + last_payment.balance))
				last_payment.fee_to_pay = Helpers.parseDouble((last_payment.capital + last_payment.interest))
				last_payment.balance 	= Helpers.parseDouble((payments[payments.length - 2].balance - last_payment.capital))
			}

			if(media_quote > 1)
			{
				
				let last_payment_balance_positive = payments[payments.length - (media_quote + 1)]
				if(last_payment_balance_positive.balance % media_quote)
				{
					let media_capital = (last_payment_balance_positive.balance / media_quote)
					for (let index = media_quote; index >= 1 ; index--)
					{
						
						let payment 		= payments[numberOfCoutas - index]
						payment.capital 	= Helpers.parseDouble(media_capital)
						payment.balance 	= Helpers.parseDouble(( payments[numberOfCoutas - (index + 1)].balance - payment.capital ))
						let interest_next 	= (payments[numberOfCoutas - (index + 1)].balance * porcentaje)
						payment.interest 	= Helpers.parseDouble(interest_next)
						payment.fee_to_pay 	= Helpers.parseDouble(( payment.capital + payment.interest ))
						payments[numberOfCoutas - index] = Object.assign({}, payment)
					}
				}				
			}
		}
		
		return payments

}

module.exports = {
	Frances	
}