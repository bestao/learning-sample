import {log, readonly, inject, enity} from './decorators'

class Person {
  @inject()
  public name: string;

  @inject('Tencent')
  public compony: string

  @readonly
  public age : number = 25;

  @log
  walking() {
    console.log(`I'm walking.`)
  }

  toString (){
    return `I'm ${this.name}, ${this.age} years old, is working in ${this.compony}.`
  }
}

@enity(Person)
class Student {
  learn(){
    console.log('I will be learn')
  }
}

const p = new Person()
p.walking()

console.log(p.toString())


const stu = new Student()
console.log(stu.age)
stu.walking()
stu.learn()