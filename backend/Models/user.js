const mongoose = require("mongoose");
const {Schema} = mongoose;

//Connection
main()
.then(()=>{
    console.log("Connection Successful");
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

//Schema
const userSchema = new Schema({
    username: String,
    addresses: [
        {
            location: String,
            city: String
        }
    ]
});

//Models
const User = mongoose.model("User", userSchema);