// ============================================
// TYPESCRIPT COMPREHENSIVE GUIDE
// ============================================

// ============================================
// 1. BASIC TYPES
// ============================================

// Primitive types
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
let notSure: any = 4;
let nothing: undefined = undefined;
let nothingElse: null = null;

// Arrays
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Tuple
let tuple: [string, number] = ["hello", 10];

// Enum
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}

// Void, Never
function warnUser(): void {
  console.log("This is a warning message");
}

function error(message: string): never {
  throw new Error(message);
}

// Unknown (type-safe alternative to any)
let userInput: unknown;
userInput = 5;
userInput = "hello";
// We need to check type before using
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

// ============================================
// 2. TYPE ALIASES
// ============================================

// Simple type alias
type ID = string | number;
let userId: ID = "abc123";
let productId: ID = 12345;

// Object type alias
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };

// Complex type alias
type User = {
  id: ID;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
};

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  createdAt: new Date(),
};

// Function type alias
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// ============================================
// 3. INTERFACES
// ============================================

// Basic interface
interface Animal {
  name: string;
  age: number;
  makeSound(): void;
}

const dog: Animal = {
  name: "Buddy",
  age: 5,
  makeSound() {
    console.log("Woof!");
  },
};

// Interface with optional and readonly properties
interface Book {
  readonly isbn: string;
  title: string;
  author: string;
  pages?: number;
  publish(): void;
}

// Interface extending another interface
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
  department: string;
}

const employee: Employee = {
  name: "Alice",
  age: 30,
  employeeId: 1001,
  department: "Engineering",
};

// Multiple interface inheritance
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

interface Duck extends Flyable, Swimmable {
  quack(): void;
}

const duck: Duck = {
  fly() {
    console.log("Flying...");
  },
  swim() {
    console.log("Swimming...");
  },
  quack() {
    console.log("Quack!");
  },
};

// Interface for function signatures
interface SearchFunc {
  (source: string, substring: string): boolean;
}

const mySearch: SearchFunc = (src, sub) => {
  return src.includes(sub);
};

// Indexable types
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = ["Bob", "Fred"];

interface Dictionary {
  [key: string]: any;
}

const dict: Dictionary = {
  name: "John",
  age: 25,
};

// ============================================
// 4. UNION TYPES
// ============================================

// Basic union
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 42;

// Union with literal types
type Direction = "north" | "south" | "east" | "west";
let direction: Direction = "north";

// Union of object types
type Success = {
  status: "success";
  data: any;
};

type Error = {
  status: "error";
  message: string;
};

type ApiResponse = Success | Error;

function handleResponse(response: ApiResponse) {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.message);
  }
}

// ============================================
// 5. INTERSECTION TYPES
// ============================================

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

// ============================================
// 6. FUNCTION TYPES
// ============================================

// Function with typed parameters and return type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Optional parameters
function buildName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName;
}

// Default parameters
function calculatePrice(price: number, tax: number = 0.1): number {
  return price * (1 + tax);
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0);
}

// Function overloads
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  return a + b;
}

const result1 = combine("Hello", " World"); // string
const result2 = combine(5, 10); // number

// Arrow functions
const square = (x: number): number => x * x;

// Function as parameter (callback)
function processArray(
  arr: number[],
  callback: (item: number) => number
): number[] {
  return arr.map(callback);
}

const doubled = processArray([1, 2, 3, 4], (x) => x * 2);

// ============================================
// 7. TYPE GUARDS
// ============================================

// typeof type guard
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// instanceof type guard
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

// in operator type guard
type Car = {
  drive(): void;
};

type Boat = {
  sail(): void;
};

function operate(vehicle: Car | Boat) {
  if ("drive" in vehicle) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}

// Custom type guard (type predicate)
interface Cat {
  meow(): void;
}

interface Dog {
  bark(): void;
}

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

// Discriminated unions (tagged unions)
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

// ============================================
// 8. GENERICS
// ============================================

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>("hello");
const auto = identity(true); // Type inference

// Generic with constraints
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");
logLength([1, 2, 3]);
// logLength(123); // Error: number doesn't have length

// Generic interfaces
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: "hello" };

// Generic classes
class Container<T> {
  private contents: T[] = [];

  add(item: T): void {
    this.contents.push(item);
  }

  remove(): T | undefined {
    return this.contents.pop();
  }

  getAll(): T[] {
    return this.contents;
  }
}

const numberContainer = new Container<number>();
numberContainer.add(1);
numberContainer.add(2);

const stringContainer = new Container<string>();
stringContainer.add("a");
stringContainer.add("b");

// Multiple type parameters
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const p1 = pair("name", "John");
const p2 = pair(1, true);

// Generic constraints with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
const personName = getProperty(person, "name");
const personAge = getProperty(person, "age");
// const invalid = getProperty(person, "invalid"); // Error

// ============================================
// 9. MAPPED TYPES
// ============================================

// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;

const partialTodo: PartialTodo = {
  title: "Learn TypeScript",
};

// Make all properties required
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyTodo = Readonly<Todo>;

// Pick specific properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type TodoPreview = Pick<Todo, "title" | "completed">;

// Omit specific properties
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type TodoInfo = Omit<Todo, "completed">;

// Record type
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type PageInfo = {
  title: string;
};

type Pages = "home" | "about" | "contact";

const pages: Record<Pages, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};

// Custom mapped type example
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;

// ============================================
// 10. UTILITY TYPES
// ============================================

// Awaited - Unwrap Promise types
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number

// ReturnType - Get function return type
type Fn = () => string;
type FnReturn = ReturnType<Fn>; // string

function getUserInfo() {
  return { name: "John", age: 30 };
}
type UserInfo = ReturnType<typeof getUserInfo>;

// Parameters - Get function parameters as tuple
type Params = Parameters<typeof greet>; // [string]

// Exclude - Exclude types from union
type T1 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"

// Extract - Extract types from union
type T2 = Extract<"a" | "b" | "c", "a" | "f">; // "a"

// NonNullable - Remove null and undefined
type T3 = NonNullable<string | number | undefined | null>; // string | number

// ============================================
// 11. CONDITIONAL TYPES
// ============================================

type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false

// Nested conditional types
type TypeName<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends undefined
  ? "undefined"
  : T extends Function
  ? "function"
  : "object";

type T4 = TypeName<string>; // "string"
type T5 = TypeName<42>; // "number"

// Infer keyword in conditional types
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type T6 = GetReturnType<() => string>; // string
type T7 = GetReturnType<(x: number) => number[]>; // number[]

// ============================================
// 12. CLASSES
// ============================================

class Animal2 {
  // Public by default
  name: string;

  // Private - only accessible within class
  private age: number;

  // Protected - accessible within class and subclasses
  protected species: string;

  // Readonly
  readonly id: number;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
    this.id = Math.random();
  }

  public getInfo(): string {
    return `${this.name} is ${this.age} years old`;
  }
}

class Dog2 extends Animal2 {
  constructor(name: string, age: number) {
    super(name, age, "Canine");
  }

  public bark(): void {
    console.log("Woof!");
    console.log(`I am a ${this.species}`); // Can access protected
  }
}

// Abstract classes
abstract class Shape2 {
  abstract getArea(): number;

  printArea(): void {
    console.log(`Area: ${this.getArea()}`);
  }
}

class Circle2 extends Shape2 {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

// Class implementing interface
interface Printable {
  print(): void;
}

class Document implements Printable {
  constructor(private content: string) {}

  print(): void {
    console.log(this.content);
  }
}

// Parameter properties shorthand
class Product {
  constructor(
    public name: string,
    private price: number,
    readonly id: number
  ) {}

  getPrice(): number {
    return this.price;
  }
}

// ============================================
// 13. DECORATORS (Experimental)
// ============================================

// Note: Requires "experimentalDecorators": true in tsconfig.json

// Class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

// Property decorator
function format(formatString: string) {
  return function (target: any, propertyKey: string) {
    let value: string;
    const getter = () => value;
    const setter = (newVal: string) => {
      value = `${formatString} ${newVal}`;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

// ============================================
// 14. NAMESPACES & MODULES
// ============================================

namespace Validation {
  export interface StringValidator {
    isValid(s: string): boolean;
  }

  export class EmailValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.includes("@");
    }
  }

  export class URLValidator implements StringValidator {
    isValid(s: string): boolean {
      return s.startsWith("http://") || s.startsWith("https://");
    }
  }
}

const emailValidator = new Validation.EmailValidator();
console.log(emailValidator.isValid("test@example.com"));

// ============================================
// 15. ADVANCED PATTERNS
// ============================================

// Builder Pattern
class UserBuilder {
  private user: Partial<User> = {};

  setId(id: ID): this {
    this.user.id = id;
    return this;
  }

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  build(): User {
    if (!this.user.id || !this.user.name || !this.user.email) {
      throw new Error("Missing required fields");
    }
    return {
      ...this.user,
      createdAt: new Date(),
    } as User;
  }
}

const newUser = new UserBuilder()
  .setId(1)
  .setName("Jane")
  .setEmail("jane@example.com")
  .build();

// Factory Pattern
interface Vehicle {
  drive(): void;
}

class Car2 implements Vehicle {
  drive(): void {
    console.log("Driving a car");
  }
}

class Bike implements Vehicle {
  drive(): void {
    console.log("Riding a bike");
  }
}

class VehicleFactory {
  static createVehicle(type: "car" | "bike"): Vehicle {
    switch (type) {
      case "car":
        return new Car2();
      case "bike":
        return new Bike();
    }
  }
}

const myCar = VehicleFactory.createVehicle("car");
const myBike = VehicleFactory.createVehicle("bike");

// Singleton Pattern
class Database {
  private static instance: Database;

  private constructor() {
    // Private constructor prevents instantiation
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query(sql: string): void {
    console.log(`Executing: ${sql}`);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true

// ============================================
// 16. TYPE ASSERTIONS
// ============================================

// as syntax
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// Angle-bracket syntax (not available in JSX)
let someValue2: unknown = "this is a string";
let strLength2: number = (<string>someValue2).length;

// Non-null assertion
function getValue(): string | null {
  return "value";
}

let definiteValue = getValue()!; // Assert it's not null

// Const assertions
let x = "hello" as const; // type: "hello" (literal)
let y = [1, 2, 3] as const; // type: readonly [1, 2, 3]

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const;

// ============================================
// 17. TEMPLATE LITERAL TYPES
// ============================================

type World = "world";
type Greeting = `hello ${World}`; // "hello world"

type EmailLocale = "en" | "es" | "fr";
type EmailType = "welcome" | "reset" | "verify";
type EmailTemplate = `${EmailLocale}_${EmailType}`;
// "en_welcome" | "en_reset" | "en_verify" | "es_welcome" | ...

// Intrinsic string manipulation types
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

type ShoutGreeting = Uppercase<"hello">; // "HELLO"
type WhisperGreeting = Lowercase<"HELLO">; // "hello"

// ============================================
// 18. INDEX SIGNATURES & MAPPED TYPES
// ============================================

interface FlexibleObject {
  [key: string]: string | number | boolean;
  name: string; // Known properties
}

const obj: FlexibleObject = {
  name: "John",
  age: 30,
  isActive: true,
};

// String manipulation with mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Person2 = {
  name: string;
  age: number;
};

type PersonGetters = Getters<Person2>;
// { getName: () => string; getAge: () => number; }

// ============================================
// 19. VARIANCE & COVARIANCE
// ============================================

// Covariance (return types)
interface Animal3 {
  name: string;
}

interface Dog3 extends Animal3 {
  breed: string;
}

let getAnimal: () => Animal3;
let getDog: () => Dog3 = () => ({ name: "Buddy", breed: "Labrador" });

getAnimal = getDog; // OK: Dog3 is a subtype of Animal3

// Contravariance (parameter types)
let feedAnimal: (animal: Animal3) => void = (animal) => {
  console.log(animal.name);
};

let feedDog: (dog: Dog3) => void;
feedDog = feedAnimal; // OK in TypeScript

// ============================================
// 20. ASSERTION FUNCTIONS
// ============================================

function assert(condition: any, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg || "Assertion failed");
  }
}

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Value must be a string");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  // Now TypeScript knows value is a string
  console.log(value.toUpperCase());
}

// ============================================
// 21. THIS TYPES
// ============================================

interface Counter {
  count: number;
  increment(this: Counter): this;
  reset(this: Counter): this;
}

const counter: Counter = {
  count: 0,
  increment() {
    this.count++;
    return this;
  },
  reset() {
    this.count = 0;
    return this;
  },
};

counter.increment().increment().reset();

// ============================================
// 22. RECURSIVE TYPES
// ============================================

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const jsonData: JSONValue = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"],
  address: {
    street: "123 Main St",
    city: "Boston",
  },
};

// Recursive conditional type
type Awaited2<T> = T extends Promise<infer U> ? Awaited2<U> : T;

type T8 = Awaited2<Promise<Promise<string>>>; // string

// ============================================
// 23. SYMBOL & UNIQUE SYMBOL
// ============================================

const sym = Symbol("key");
const obj2 = {
  [sym]: "value",
};

// Unique symbol
const uniqueSym: unique symbol = Symbol("unique");

interface WithUniqueSymbol {
  [uniqueSym]: string;
}

// ============================================
// 24. MIXINS
// ============================================

type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActive = false;
    activate() {
      this.isActive = true;
    }
    deactivate() {
      this.isActive = false;
    }
  };
}

class BaseUser {
  name = "";
}

const TimestampedUser = Timestamped(BaseUser);
const ActivatableUser = Activatable(TimestampedUser);

const mixedUser = new ActivatableUser();
mixedUser.name = "John";
mixedUser.activate();
console.log(mixedUser.timestamp);

// ============================================
// 25. MODULE AUGMENTATION
// ============================================

// Extending existing types
declare global {
  interface Array<T> {
    customMethod(): void;
  }
}

Array.prototype.customMethod = function () {
  console.log("Custom method called");
};

// ============================================
// SUMMARY
// ============================================

console.log("TypeScript Comprehensive Examples Loaded!");
console.log("Topics covered:");
console.log("1. Basic Types");
console.log("2. Type Aliases");
console.log("3. Interfaces");
console.log("4. Union Types");
console.log("5. Intersection Types");
console.log("6. Function Types");
console.log("7. Type Guards");
console.log("8. Generics");
console.log("9. Mapped Types");
console.log("10. Utility Types");
console.log("11. Conditional Types");
console.log("12. Classes");
console.log("13. Decorators");
console.log("14. Namespaces");
console.log("15. Design Patterns");
console.log("16. Type Assertions");
console.log("17. Template Literal Types");
console.log("18. Index Signatures");
console.log("19. Variance");
console.log("20. Assertion Functions");
console.log("21. This Types");
console.log("22. Recursive Types");
console.log("23. Symbols");
console.log("24. Mixins");
console.log("25. Module Augmentation");
