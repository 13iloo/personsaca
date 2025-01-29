import Person from '../models/Person.js'

// Remember, if we have a large architecture we need to abstract away the differences between storage orm types ( like mongoose and sequelize).
// Then we would move most of this code to a repository and this class talks to the repository in a common way
class PersonManager {
    constructor() {
        this.Person = Person;
    }

    async initialize(app = null) {
        // No Initialization required in this class
        // return stats if somebody wants to check
        return true;
    }

    async fetchAll() {
        try {
            const allPersons = await this.Person.findAll();

            return allPersons
        } catch (e) {
            console.log('No persons loaded');
            return []
        }
    }

    async add(firstName, lastName ) {
        try {
            const newPerson = await this.Person.create({
                firstName: firstName,
                lastName: lastName,
            });
            return newPerson;
        } catch (error) {
            console.log('Error in creation of new Person');
            throw error;

        }
    }

    // and the rest
}

export default PersonManager;