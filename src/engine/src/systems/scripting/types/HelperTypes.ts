import { Container } from "./Containers"

export type ContainerMap<T extends unknown[]> ={ [K in keyof T]: Container<T[K]>}
export type TypeMap<T extends unknown[]> ={ [K in keyof T]: (new() => T[K])}