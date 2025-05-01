import mongo from 'mongoose'

const blackListSchema = new mongo.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 84600
    }
})

const downlist = mongo.model("blackList", blackListSchema);

export default downlist;