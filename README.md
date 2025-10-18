# TypeScript Complete Guide - From Basics to Advanced 🚀

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A comprehensive guide covering all essential TypeScript concepts with practical, runnable examples. Perfect for reviewing TypeScript fundamentals or learning advanced patterns.

## 🎯 Why This Guide?

- **Complete Coverage**: From basic types to advanced patterns like mixins and conditional types
- **Practical Examples**: Over 1000 lines of working code you can run and experiment with
- **Well-Organized**: Clear sections with table of contents for easy navigation
- **Production-Ready**: Real-world patterns and best practices
- **Beginner to Advanced**: Suitable for all skill levels

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/typescript-complete-guide.git

# Navigate to the project
cd typescript-complete-guide

# Install dependencies
npm install

# Run the examples
npm start

# Or compile TypeScript
npm run build
```

## 📁 Project Structure

```
typescript-complete-guide/
├── index.ts              # Main file with all examples
├── examples/             # Individual example files (optional)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

## Table of Contents

1. [Basic Types](#1-basic-types)
2. [Type Aliases](#2-type-aliases)
3. [Interfaces](#3-interfaces)
4. [Union Types](#4-union-types)
5. [Intersection Types](#5-intersection-types)
6. [Function Types](#6-function-types)
7. [Type Guards](#7-type-guards)
8. [Generics](#8-generics)
9. [Mapped Types](#9-mapped-types)
10. [Utility Types](#10-utility-types)
11. [Conditional Types](#11-conditional-types)
12. [Classes](#12-classes)
13. [Decorators](#13-decorators)
14. [Namespaces & Modules](#14-namespaces--modules)
15. [Design Patterns](#15-design-patterns)
16. [Type Assertions](#16-type-assertions)
17. [Template Literal Types](#17-template-literal-types)
18. [Advanced Patterns](#18-advanced-patterns)

---

## 1. Basic Types

TypeScript provides several basic types to help you write type-safe code.

### Primitive Types

```typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let notSure: any = 4;
let nothing: undefined = undefined;
let nothingElse: null = null;
```

### Arrays

```typescript
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

### Tuples

Fixed-length arrays with known types at each position:

```typescript
let tuple: [string, number] = ["hello", 10];
```

### Enums

```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}
```

### Special Types

- **void**: Function returns nothing
- **never**: Function never returns (throws error or infinite loop)
- **unknown**: Type-safe alternative to `any`

```typescript
function warnUser(): void {
  console.log("Warning!");
}

function error(message: string): never {
  throw new Error(message);
}

let userInput: unknown;
// Must check type before using
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}
```

---

## 2. Type Aliases

Create custom type names for reusability.

```typescript
type ID = string | number;
type Point = {
  x: number;
  y: number;
};

type User = {
  id: ID;
  name: string;
  email: string;
  age?: number; // Optional
  readonly createdAt: Date; // Readonly
};
```

### Function Type Aliases

```typescript
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;
```

---

## 3. Interfaces

Define the shape of objects and classes.

### Basic Interface

```typescript
interface Animal {
  name: string;
  age: number;
  makeSound(): void;
}
```

### Interface Inheritance

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}
```

### Multiple Inheritance

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Flyable, Swimmable {
  quack(): void;
}
```

### Function Interfaces

```typescript
interface SearchFunc {
  (source: string, substring: string): boolean;
}

const mySearch: SearchFunc = (src, sub) => src.includes(sub);
```

### Indexable Types

```typescript
interface StringArray {
  [index: number]: string;
}

interface Dictionary {
  [key: string]: any;
}
```

### Type Alias vs Interface

**Use Interface when:**

- Defining object shapes
- Need to extend/implement
- Working with classes
- Want declaration merging

**Use Type Alias when:**

- Working with unions/intersections
- Need computed properties
- Working with primitives
- Need conditional types

---

## 4. Union Types

Allow a value to be one of several types.

### Basic Union

```typescript
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42; // OK
```

### Literal Unions

```typescript
type Direction = "north" | "south" | "east" | "west";
let direction: Direction = "north";
```

### Union of Objects

```typescript
type Success = {
  status: "success";
  data: any;
};

type Error = {
  status: "error";
  message: string;
};

type ApiResponse = Success | Error;
```

---

## 5. Intersection Types

Combine multiple types into one.

```typescript
type Colorful = {
  color: string;
};

type Circle = {
  radius: number;
};

type ColorfulCircle = Colorful & Circle;

const cc: ColorfulCircle = {
  color: "red",
  radius: 10,
};
```

---

## 6. Function Types

### Parameter Types

```typescript
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### Optional Parameters

```typescript
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}
```

### Default Parameters

```typescript
function calculatePrice(price: number, tax: number = 0.1): number {
  return price * (1 + tax);
}
```

### Rest Parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}
```

### Function Overloads

```typescript
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  return a + b;
}
```

### Callbacks

```typescript
function processArray(
  arr: number[],
  callback: (item: number) => number
): number[] {
  return arr.map(callback);
}
```

---

## 7. Type Guards

Narrow down types within conditional blocks.

### typeof Guard

```typescript
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

### instanceof Guard

```typescript
class Bird {
  fly() {
    console.log("Flying...");
  }
}

class Fish {
  swim() {
    console.log("Swimming...");
  }
}

function move(animal: Bird | Fish) {
  if (animal instanceof Bird) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

### in Operator Guard

```typescript
type Car = { drive(): void };
type Boat = { sail(): void };

function operate(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}
```

### Custom Type Guard (Type Predicate)

```typescript
function isCat(pet: Cat | Dog): pet is Cat {
  return (pet as Cat).meow !== undefined;
}

function makeSound(pet: Cat | Dog) {
  if (isCat(pet)) {
    pet.meow();
  } else {
    pet.bark();
  }
}
```

### Discriminated Unions

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; size: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size ** 2;
  }
}
```

---

## 8. Generics

Write reusable code that works with multiple types.

### Generic Function

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");
const auto = identity(true); // Type inference
```

### Generic Constraints

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // OK
logLength([1, 2, 3]); // OK
logLength(123); // Error
```

### Generic Interfaces

```typescript
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };
```

### Generic Classes

```typescript
class Container<T> {
  private contents: T[] = [];

  add(item: T): void {
    this.contents.push(item);
  }

  getAll(): T[] {
    return this.contents;
  }
}

const numberContainer = new Container<number>();
```

### Multiple Type Parameters

```typescript
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const p1 = pair("name", "John");
const p2 = pair(1, true);
```

### keyof Constraint

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
const name = getProperty(person, "name"); // OK
const invalid = getProperty(person, "invalid"); // Error
```

---

## 9. Mapped Types

Transform properties of existing types.

### Partial (Make all optional)

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Todo {
  title: string;
  description: string;
}

type PartialTodo = Partial<Todo>;
// { title?: string; description?: string; }
```

### Required (Make all required)

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

### Readonly (Make all readonly)

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

### Pick (Select properties)

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type TodoPreview = Pick<Todo, "title">;
```

### Omit (Remove properties)

```typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type TodoInfo = Omit<Todo, "completed">;
```

### Record (Create object type)

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type Pages = "home" | "about" | "contact";
type PageInfo = Record<Pages, { title: string }>;
```

---

## 10. Utility Types

Built-in TypeScript utility types.

### Awaited

```typescript
type A = Awaited<Promise<string>>; // string
```

### ReturnType

```typescript
function getUserInfo() {
  return { name: "John", age: 30 };
}
type UserInfo = ReturnType<typeof getUserInfo>;
```

### Parameters

```typescript
type Params = Parameters<typeof greet>; // [string]
```

### Exclude

```typescript
type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
```

### Extract

```typescript
type T2 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
```

### NonNullable

```typescript
type T3 = NonNullable<string | number | null | undefined>;
// string | number
```

---

## 11. Conditional Types

Types that depend on conditions.

### Basic Conditional

```typescript
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
```

### Nested Conditionals

```typescript
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : "object";
```

### Infer Keyword

```typescript
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type T = GetReturnType<() => string>; // string
```

---

## 12. Classes

### Access Modifiers

```typescript
class Animal {
  public name: string; // Accessible everywhere
  private age: number; // Only within class
  protected species: string; // Within class and subclasses
  readonly id: number; // Cannot be modified

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.id = Math.random();
  }
}
```

### Inheritance

```typescript
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Canine");
  }

  bark(): void {
    console.log(`${this.species} barks!`);
  }
}
```

### Abstract Classes

```typescript
abstract class Shape {
  abstract getArea(): number;

  printArea(): void {
    console.log(`Area: ${this.getArea()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

### Implementing Interfaces

```typescript
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(private content: string) {}

  print(): void {
    console.log(this.content);
  }
}
```

### Parameter Properties Shorthand

```typescript
class Product {
  constructor(
    public name: string,
    private price: number,
    readonly id: number
  ) {}
}
```

---

## 13. Decorators

Experimental feature for annotating and modifying classes and members.

### Enable in tsconfig.json

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### Class Decorator

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class MyClass {}
```

### Method Decorator

```typescript
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}
```

---

## 14. Namespaces & Modules

### Namespaces

```typescript
namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.includes("@");
    }
  }
}

const validator = new Validation.EmailValidator();
```

### ES6 Modules (Preferred)

```typescript
// user.ts
export interface User {
  id: number;
  name: string;
}

// app.ts
import { User } from "./user";
```

---

## 15. Design Patterns

### Builder Pattern

```typescript
class UserBuilder {
  private user: Partial<User> = {};

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  build(): User {
    return this.user as User;
  }
}

const user = new UserBuilder().setName("John").build();
```

### Factory Pattern

```typescript
interface Vehicle {
  drive(): void;
}

class VehicleFactory {
  static createVehicle(type: "car" | "bike"): Vehicle {
    switch (type) {
      case "car":
        return new Car();
      case "bike":
        return new Bike();
    }
  }
}
```

### Singleton Pattern

```typescript
class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
```

---

## 16. Type Assertions

Tell TypeScript you know better about a type.

### as Syntax

```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

### Non-null Assertion

```typescript
let value = getValue()!; // Assert it's not null
```

### Const Assertions

```typescript
let x = "hello" as const; // type: "hello"
let y = [1, 2, 3] as const; // type: readonly [1, 2, 3]
```

---

## 17. Template Literal Types

Create types from string templates.

```typescript
type World = "world";
type Greeting = `hello ${World}`; // "hello world"

type EmailLocale = "en" | "es" | "fr";
type EmailType = "welcome" | "reset";
type EmailTemplate = `${EmailLocale}_${EmailType}`;
// "en_welcome" | "en_reset" | "es_welcome" | ...
```

### String Manipulation Types

```typescript
type ShoutGreeting = Uppercase<"hello">; // "HELLO"
type WhisperGreeting = Lowercase<"HELLO">; // "hello"
type Title = Capitalize<"hello">; // "Hello"
```

---

## 18. Advanced Patterns

### Assertion Functions

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

function process(value: unknown) {
  assertIsString(value);
  // TypeScript knows value is string here
  console.log(value.toUpperCase());
}
```

### Recursive Types

```typescript
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };
```

### Mixins

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {}
const TimestampedUser = Timestamped(User);
```

---

## Best Practices

1. **Prefer `unknown` over `any`**: More type-safe
2. **Use strict mode**: Enable in tsconfig.json
3. **Avoid type assertions**: Use type guards instead
4. **Use const assertions**: For immutable values
5. **Leverage type inference**: Don't over-annotate
6. **Use discriminated unions**: For complex state
7. **Prefer interfaces for objects**: Better error messages
8. **Use readonly**: For immutable data
9. **Enable strict null checks**: Catch null/undefined errors
10. **Use generics**: For reusable components

---

## Common TypeScript Configurations

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## Resources

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)

---

## Conclusion

TypeScript provides powerful type system features that help catch errors at compile time, improve code documentation, and enhance IDE support. Start with basic types and gradually adopt advanced features as needed. The key is to find the right balance between type safety and development speed.

Happy coding! 🚀
