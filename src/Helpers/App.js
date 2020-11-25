class App
{
	
    static parseDouble(number, digits = 2)
	{
		return Number.parseFloat(parseFloat(number).toFixed(digits))
	}

	static borrowedTypeToDays(borrowedType, borrowedTime)
	{
		let idditionalDaysDateStart = 0
		switch (borrowedType)
		{
			case 'day':
				idditionalDaysDateStart = borrowedTime
				break;
			case 'week':
				idditionalDaysDateStart = (borrowedTime * 7)
				break;
			case 'month':
				idditionalDaysDateStart = (borrowedTime * 30)
				break;
			case 'year':
				idditionalDaysDateStart = (borrowedTime * 365)
				break;
		}
		return idditionalDaysDateStart
	}

}

module.exports = App