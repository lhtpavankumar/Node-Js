import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    img:
    {
        data: Buffer,
        contentType: String
    },
    name: { type: String, default: "" }
});

uploadSchema.method({
    saveData: async function () {
        return this.save()
    }
})

uploadSchema.static({
    findData: function (findObj) {
        return this.find(findObj)
    },

    findOneData: function (findObj) {
        return this.findOne(findObj)
    },

    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    },

    findDataWithAggregate: function (findObj) {
        return this.aggregate(findObj)
    },

    findByIdAndDeleteData: function (findObj) {
        return this.findByIdAndDelete(findObj)
    }
})

export default mongoose.model("upload-image-template", uploadSchema);

