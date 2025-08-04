const mongoose = require("mongoose");
const { Schema } = mongoose;
const findOrCreate = require("mongoose-findorcreate"); 

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        avatar: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(findOrCreate);

exports.GoggleUser = mongoose.model("User", userSchema);