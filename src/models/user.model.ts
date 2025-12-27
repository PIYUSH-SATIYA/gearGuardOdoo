import mongoose from "mongoose";

export enum UserRole {
    EMPLOYEE = "employee",
    TECHNICIAN = "technician",
    MANAGER = "manager",
    ADMIN = "admin",
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide a name"],
        },
        email: {
            type: String,
            required: [true, "please provide an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please provide a password"],
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.EMPLOYEE,
            required: [true, "please provide a role"],
        },
        avatar_url: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    },
    {
        timestamps: true, // adds created_at and updated_at
    }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
