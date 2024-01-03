import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(req) {
    const newUser = await prisma.user.create({
        data: {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
        },
    });
}

export async function createPost(req) {
    const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          author: req.body.author,
        }
    })
}

