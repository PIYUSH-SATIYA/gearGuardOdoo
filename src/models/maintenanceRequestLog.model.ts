import mongoose from "mongoose";
import { MaintenanceRequestStatus } from "./maintenanceRequest.model";

const maintenanceRequestLogSchema = new mongoose.Schema(
    {
        // FK to maintenance_requests
        request_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "maintenance_requests",
            required: [true, "request is required"],
        },
        from_status: {
            type: String,
            enum: Object.values(MaintenanceRequestStatus),
        },
        to_status: {
            type: String,
            enum: Object.values(MaintenanceRequestStatus),
            required: [true, "to_status is required"],
        },
        // FK to users
        changed_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "changed_by is required"],
        },
        changed_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: false, // We handle changed_at manually
    }
);

// Index for audit queries
maintenanceRequestLogSchema.index({ request_id: 1 });
maintenanceRequestLogSchema.index({ changed_at: 1 });

const MaintenanceRequestLog =
    mongoose.models.maintenance_request_logs ||
    mongoose.model("maintenance_request_logs", maintenanceRequestLogSchema);

export default MaintenanceRequestLog;
