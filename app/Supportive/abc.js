class Person {
    constructor(age){
        this.Age = age;
    }
    olderBy(age){
        return this.Age + age;
    }
}


module.exports = Person;