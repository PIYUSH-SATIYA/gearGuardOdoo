import mongoose from "mongoose";

const maintainanceTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
    },
    teamMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    ],
    teamId: {
        type: String,
        required: [true, "please provide a team ID"],
        unique: true,
    },
});

export const MaintainanceTeam =
    mongoose.models.MaintainanceTeam ||
    mongoose.model("MaintainanceTeam", maintainanceTeamSchema);
