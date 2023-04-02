// key 类型不确定时候的泛型处理方法
// 根据key 值推断出正确的类型 使用keyof 和泛型
interface Person{
    name: string;
    age: number;
    gender:string;
}

class Teacher{
    constructor(private info:Person){}
    // 1.key 是一个不确定的类型
    // 2.key 取值为Person 中的keyof 中的一种
    // 3. 返回Person[T]
    getInfo<T extends keyof Person>(key:T):Person[T]{
        return this.info[key]
    }
}



// T extends keyof Person  
// key:  'age'
// Person['age']


// type T = 'gender'
// key:  'gender'
// Person['gender'] ==> string

const teacher = new Teacher({
    name:'dell',
    age:18,
    gender:'male'
})

const test = teacher.getInfo('name')
console.log(test);