class Person {
    constructor(age){
        this.Age = age;
        this.Pet = {};
    }
    olderBy(age){
        return this.Age + age;
    }
    setPet(pet){
        this.Pet = pet;
    }
}

class Dog {
    constructor(age){
        this.Age = age;
    }
    olderBy(age){
        return this.Age + age;
    }
    getOlder(age){
        this.Age += age;
        return this.Age;
    }
}


export {Person, Dog};