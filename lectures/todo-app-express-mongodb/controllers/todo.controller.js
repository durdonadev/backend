import { ObjectId } from "mongodb";
class TodoController {
    getAll = async (req, res) => {
        const { db } = req;
        try {
            const collection = db.collection("todos");
            const todos = await collection.find().toArray();

            res.status(200).json({
                data: todos,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to get all your todos",
            });
        }
    };

    create = async (req, res) => {
        try {
            const { body, db } = req;
            const collection = db.collection("todos");
            await collection.insertOne(body);

            res.status(201).json({
                message: "Success",
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Failed to save your Todo",
            });
        }
    };

    getOne = async (req, res) => {
        try {
            const { params, db } = req;

            const collection = db.collection("todos");
            const todo = await collection
                .find({ _id: new ObjectId(params.id) })
                .toArray();

            res.status(200).json({
                data: todo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error,
            });
        }
    };

    delete = async (req, res) => {
        try {
            const { params, db } = req;
            const collection = db.collection("todos");
            await collection.deleteMany({ _id: new ObjectId(params.id) });

            res.status(200).send();
        } catch (error) {
            res.status(500).json({
                message: error,
            });
        }
    };

    update = async (req, res) => {
        try {
            const { params, body, db } = req;

            const collection = db.collection("todos");
            await collection.updateOne(
                { _id: new ObjectId(params.id) },
                { $set: body }
            );

            res.status(200).json({
                message: "Success",
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed",
            });
        }
    };
}
export const todoController = new TodoController();
