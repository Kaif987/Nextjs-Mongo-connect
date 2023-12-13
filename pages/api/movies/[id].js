import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
    try {
        // const obj_id = ObjectId(id)
        const client = await clientPromise;
        const db = client.db("sample_mflix")
        const id = `${req.query.id}`

        const movie = await db
            .collection("movies")
            .findOne({ "_id": ObjectId(id) })

        res.json({ movie })
    } catch (e) {
        console.log(e)
    }
}

