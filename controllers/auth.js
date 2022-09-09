import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, password, role } = req.body

        const isUsed = await User.findOne({ username })

        if (username.length < 1 || password.length < 1) {
            return res.json({
                message: 'Введите имя или пароль'
            })
        }

        if (isUsed) {
            return res.json({
                message: 'Username занят'
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
            role
        })
        
        const token = jwt.sign(
            {
                id: newUser._id,
                role: newUser.role
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно'
        })

    } catch (error) {
        res.json({
            message: 'Ошибка при создании пользователя'
        })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (username.length < 1 || password.length < 1) {
            return res.json({
                message: 'Введите имя или пароль'
            })
        }

        if (!user && username.length > 1) {
            return res.json({
                message: 'User не существует'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.json({
                message: "Неверный пароль"
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            token,
            user,
            message: 'Вы вошли в систему'
        })

    } catch (error) {
        res.json({
            message: 'Ошибка при авторизации'
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.json({
                message: 'User не существует'
            })
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'}
        )

        res.json({
            user,
            token
        })

    } catch (error) {
        res.json({
            message: 'Нет доступа'
        })
    }
}