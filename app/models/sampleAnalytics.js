import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    username: { type: String, default: "" },
    name: { type: String, default: "" },
    address: { type: Array, default: "" },
    birthdate: { type: Date },
    email: { type: String, default: "" },
    active: { type: Boolean, default: false },
    accounts: { type: Array, default: [] },
    tier_and_details: { type: Object },
});

customerSchema.method({
    saveData: async function () {
        return this.save()
    }
})

customerSchema.static({
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

export default mongoose.model("customers", customerSchema);
