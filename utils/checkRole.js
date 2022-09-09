import jwt, { decode } from "jsonwebtoken"

export const checkRole = (role) => {
    return (req, res, next) => {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                if (decoded.role !== role) {
                    return res.json({
                        message: 'Вы не админ'
                    })
                }
                req.userId = decoded.id

                next()

            } catch (error) {
                return res.json({
                    message: 'Нет доступа'
                })
            }
        } else {
            return res.json({
                message: 'Нет доступа'
            })
        }
    }
}