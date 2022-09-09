import Post from "../models/Post.js"
import User from "../models/User.js"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"

export const createPost = async (req, res) => {
    try {
        const { title, text, github, link } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                github,
                link,
                imgUrl: fileName,
                author: req.userId
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            })

            return res.json(newPostWithImage)
        }

    } catch (error) {
        res.json({
            message: 'Что-то пошло не так'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')

        if (!posts) {
            return res.json({
                message: 'Постов нет'
            })
        }

        res.json({ posts })

    } catch (error) {
        console.log(error)
    }
}

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })

        res.json(post)

    } catch (error) {
        console.log(error)
    }
}