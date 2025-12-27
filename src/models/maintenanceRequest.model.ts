import mongoose from "mongoose";

export enum MaintenanceRequestType {
    CORRECTIVE = "corrective",
    PREVENTIVE = "preventive",
}

export enum MaintenanceRequestStatus {
    NEW = "new",
    IN_PROGRESS = "in_progress",
    REPAIRED = "repaired",
    SCRAP = "scrap",
}

const maintenanceRequestSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: [true, "please provide a subject"],
        },
        description: {
            type: String,
        },
        type: {
            type: String,
            enum: Object.values(MaintenanceRequestType),
            required: [true, "please provide request type"],
        },
        // FK to equipment (required)
        equipment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "equipment",
            required: [true, "equipment is required"],
        },
        // FK to maintenance_teams (auto-filled from equipment)
        maintenance_team_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "maintenance_teams",
            required: [true, "maintenance team is required"],
        },
        // FK to users (assigned technician)
        assigned_technician_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            enum: Object.values(MaintenanceRequestStatus),
            default: MaintenanceRequestStatus.NEW,
        },
        // Only for preventive maintenance
        scheduled_date: {
            type: Date,
        },
        started_at: {
            type: Date,
        },
        completed_at: {
            type: Date,
        },
        duration_minutes: {
            type: Number,
        },
        // FK to users (creator)
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "creator is required"],
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt
    }
);

// Index for queries
maintenanceRequestSchema.index({ status: 1 });
maintenanceRequestSchema.index({ scheduled_date: 1 });
maintenanceRequestSchema.index({ equipment_id: 1 });
maintenanceRequestSchema.index({ maintenance_team_id: 1 });

const MaintenanceRequest =
    mongoose.models.maintenance_requests ||
    mongoose.model("maintenance_requests", maintenanceRequestSchema);

export default MaintenanceRequest;
