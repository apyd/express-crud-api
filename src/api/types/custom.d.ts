declare global {
    namespace Express {
        interface Request {
            user: CurrentUser
        }
    }
}

export default global