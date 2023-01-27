export interface APIResponse<T> {
    statusCode: number,
    responseBody: T
}