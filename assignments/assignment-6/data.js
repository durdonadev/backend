export const cars = {
    "550e8400-e29b-41d4-a716-446655440000": {
        id: "550e8400-e29b-41d4-a716-446655440000",
        make: "Toyota",
        model: "Camry",
        color: "Blue",
        registrationDate: "2022-09-15",
        registrationExpiration: "2023-09-15",
        dailyRate: 50,
        mileage: 20000
    },
    "9b34a4e3-a1d4-4f3e-af4d-7c262a36711e": {
        id: "9b34a4e3-a1d4-4f3e-af4d-7c262a36711e",
        make: "Honda",
        model: "Accord",
        color: "Black",
        registrationDate: "2021-12-01",
        registrationExpiration: "2022-12-01",
        dailyRate: 45,
        mileage: 35000
    }
    // More cars can be added here
};

export const rentals = {
    "9a35b597-e32f-43f9-80cc-1911ebecb7e2": {
        id: "9a35b597-e32f-43f9-80cc-1911ebecb7e2",
        carId: "550e8400-e29b-41d4-a716-446655440000", // Reference to a car
        startDate: "2023-10-01",
        endDate: "2023-10-10"
    },
    "b1ec4dda-18bf-4ed7-a4a3-6dbd7e2887ca": {
        id: "b1ec4dda-18bf-4ed7-a4a3-6dbd7e2887ca",
        carId: "9b34a4e3-a1d4-4f3e-af4d-7c262a36711e", // Reference to another car
        startDate: "2023-11-15",
        endDate: "2023-11-25"
    }
    // More rentals can be added here
};

export const maintenance = {
    "c2308f38-1c3a-4c6a-9f49-0c6d74f7820e": {
        id: "c2308f38-1c3a-4c6a-9f49-0c6d74f7820e",
        carId: "550e8400-e29b-41d4-a716-446655440000", // Reference to a car
        oilChange: [
            { date: "2023-01-15", mileage: 18000 },
            { date: "2023-07-01", mileage: 20000 }
        ]
    },
    "f6b0f3f7-8fb2-42b7-8907-4a3bc379db5f": {
        id: "f6b0f3f7-8fb2-42b7-8907-4a3bc379db5f",
        carId: "9b34a4e3-a1d4-4f3e-af4d-7c262a36711e", // Reference to another car
        oilChange: [
            { date: "2022-06-15", mileage: 30000 },
            { date: "2023-01-20", mileage: 34000 }
        ]
    }
    // More maintenance records can be added here
};
