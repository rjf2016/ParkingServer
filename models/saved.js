var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: {type: String, required: true},
    location: {type: [Number], required: true}, // [Long, Lat]
    multiplespots: {type: Number},
    created_at: {type: Date, default: Date.now}
});

UserSchema.index({ "location": "2dsphere" });


// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

var Saved = mongoose.model("saved", UserSchema);
module.exports = Saved;


