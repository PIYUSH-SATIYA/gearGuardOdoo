import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide a department name"],
            unique: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

const Department =
    mongoose.models.departments ||
    mongoose.model("departments", departmentSchema);

export default Department;
