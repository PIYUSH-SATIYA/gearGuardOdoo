import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide equipment name"],
        },
        serial_number: {
            type: String,
            required: [true, "please provide serial number"],
            unique: true,
        },
        category: {
            type: String, // Can be: CNC, Printer, Laptop, etc.
        },
        purchase_date: {
            type: Date,
        },
        warranty_expiry_date: {
            type: Date,
        },
        location: {
            type: String,
        },
        // FK to departments
        department_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "departments",
        },
        // FK to users (assigned employee)
        assigned_employee_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        // FK to maintenance_teams (required)
        maintenance_team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "maintenance_teams",
            required: [true, "maintenance team is required"],
        },
        // FK to users (default technician)
        default_technician_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        is_scrapped: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

const Equipment =
    mongoose.models.equipment || mongoose.model("equipment", equipmentSchema);

export default Equipment;
