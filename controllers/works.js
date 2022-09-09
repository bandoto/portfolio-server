import Work from "../models/Work.js"
import User from "../models/User.js"

export const createWork = async (req, res) => {
    try {
        const { company, period, location, description } = req.body

        const newWork = new Work({
            company,
            period,
            location,
            description
        })

        await newWork.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { works: newWork }
        })

        return res.json(newWork)

    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const works = await Work.find().sort('-createdAt')

        if (!works) {
            return res.json({
                message: 'Работ нет'
            })
        }

        res.json({ works })

    } catch (error) {
        console.log(error)
    }
}
