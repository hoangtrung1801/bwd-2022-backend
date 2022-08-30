export default interface Service<T> {
    findAll: () => Promise<T[]>;
    findById: (id: string) => Promise<T>;
    create: (object: T) => Promise<T>;
    update: () => Promise<T>;
    delete: () => Promise<T>;
}
