import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    role: { type: String, default: "" },

});

userSchema.method({
    saveData: async function () {
        return this.save()
    }
})

userSchema.static({
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
})

export default mongoose.model("user-roles", userSchema);
