import {HttpContext} from "@adonisjs/core/http";

export default class CorsMiddleware {
    public async handle ({ response }: HttpContext, next: () => Promise<void>) {
        // Add CORS headers to the response
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
        response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

        // Call the next middleware
        await next()
    }
}
