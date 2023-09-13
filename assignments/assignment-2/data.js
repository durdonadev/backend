const { faker } = require("@faker-js/faker");

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const data = ids.reduce((people, id) => {
    const person = {
        id,
        name: faker.person.fullName(),
        profession: faker.person.jobTitle(),
        avatar: faker.image.avatarGitHub(),
        about: faker.lorem.text(),
    };

    return { ...people, [id]: person };
}, {});

module.exports = {
    data,
};
