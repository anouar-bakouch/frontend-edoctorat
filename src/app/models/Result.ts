interface Result<Type> {
    count: number,
    next: string | null, 
    previous: string | null, 
    results: Type[]
}

export default Result;