# AMORTIZATION SYSTEMS

This module allows you to calculate repayments for loans. It is based on the German, American, Direct and French amortization systems.

## Installation

```bash
npm install amortization-system
```

## Usage

```javascript
const AmortizationSystem = require('amortization-system')

const credit = {
    borrowed_capital: 10000,
    how_many_payments: 180,
    interest: 2.25,
    date_start: Date(),
    borrowed_type: 'month',
    borrowed_time: 180
}

console.table(
    AmortizationSystem.Aleman(
        credit.borrowed_capital, credit.how_many_payments,
        credit.interest, credit.date_start,
        credit.borrowed_type, credit.borrowed_time
    )
)

console.table(
    AmortizationSystem.Americano(
        credit.borrowed_capital, credit.how_many_payments,
        credit.interest, credit.date_start,
        credit.borrowed_type, credit.borrowed_time
    )
)

console.table(
    AmortizationSystem.Directo(
        credit.borrowed_capital, credit.how_many_payments,
        credit.interest, credit.date_start,
        credit.borrowed_type, credit.borrowed_time
    )
)

console.table(
    AmortizationSystem.Frances(
        credit.borrowed_capital, credit.how_many_payments,
        credit.interest, credit.date_start,
        credit.borrowed_type, credit.borrowed_time
    )
)

```

## License
[MIT](https://choosealicense.com/licenses/mit/)