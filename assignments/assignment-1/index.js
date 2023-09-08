const fs = require("fs");

class FinancialAnalytics {
    static writeFile(fileUrl, data) {
        fs.writeFile(fileUrl, JSON.stringify(data), (err) => {
            if (err) {
                throw err;
            }
        });
    }

    static readJSONData(filename, dataCallback, writeCallback) {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            const parsedData = JSON.parse(data);
            const transformedData = dataCallback(parsedData);

            writeCallback("newData.json", transformedData);
        });
    }

    static calculateMonthlySavings(data) {
        // const monthlySavings = {};

        // for (const person in data) {
        //     const id = person.id;
        //     monthlySavings[id] = {};

        //     for (const month in person.incomes) {
        //         const montrhlyIncome = person.incomes[month];
        //         const totalMonthlyExpenses = person.expenses[month];
        //         const monthlyExpense = Object.values(
        //             totalMonthlyExpenses
        //         ).reduce((acc, expense) => acc + expense, 0);

        //         if (expenses) {
        //             const savings = montrhlyIncome - monthlyExpense;
        //             monthlySavings[id][month] = savings;
        //         }
        //     }
        // }
        // return monthlySavings;
        const monthlySavings = {};

        for (const personId in data) {
            const personData = data[personId];
            monthlySavings[personId] = {};

            for (const month in personData.income) {
                const monthlyIncome = personData.income[month];
                const totalMonthlyExpenses = personData.expenses[month];
                const monthlyExpense = Object.values(
                    totalMonthlyExpenses
                ).reduce((acc, expense) => acc + expense, 0);
                const savings = monthlyIncome - monthlyExpense;
                monthlySavings[personId][month] = savings;
            }
        }

        return monthlySavings;
    }

    static compareMonthlyExpenses(data) {
        const monthlyExpenses = {};

        for (const person in data) {
            for (const month in person.expenses) {
                if (!monthlyExpenses[month]) {
                    monthlyExpenses[month] = {};
                }

                for (const category in person.expenses[month]) {
                    monthlyExpenses[month][category] = {
                        max: { id: null, amount: 0 },
                        min: { id: null, amount: 0 }
                    };

                    const amount = person.expenses[month][category];

                    if (amount > monthlyExpenses[month][category].max.amount) {
                        monthlyExpenses[month][category].max.id = person.id;
                        monthlyExpenses[month][category].max.amount = amount;
                    }

                    if (amount < monthlyExpenses[month][category].min.amount) {
                        monthlyExpenses[month][category].min.id = person.id;
                        monthlyExpenses[month][category].min.amount = amount;
                    }
                }
            }
        }

        return monthlyExpenses;
    }

    static calculateAnnualExpenses(data) {
        const annualExpenses = {};

        for (const personId in data) {
            const person = data[personId];
            annualExpenses[personId] = {};

            const categories = [
                "food",
                "rent",
                "entertainment",
                "transportation"
            ];

            for (const category of categories) {
                let totalExpenses = 0;

                for (const month in person.expenses) {
                    totalExpenses += person.expenses[month][category] || 0;
                }

                annualExpenses[personId][category] = totalExpenses;
            }
        }

        return annualExpenses;
    }

    init(fileUrl, transformDataFunc) {
        FinancialAnalytics.readJSONData(
            fileUrl,
            transformDataFunc,
            FinancialAnalytics.writeFile
        );
    }
}

const analitics = new FinancialAnalytics();

// analitics.init("data.json", FinancialAnalytics.calculateMonthlySavings);
// analitics.init("data.json", FinancialAnalytics.compareMonthlyExpenses);
analitics.init("data.json", FinancialAnalytics.calculateAnnualExpenses);
