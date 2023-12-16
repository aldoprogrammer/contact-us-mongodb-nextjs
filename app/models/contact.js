const { Schema, default: mongoose } = require("mongoose");


const contactSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minLenght: [2, "Name must be larger than 2 characters"],
        maxLength: [50, "Name must be lesser than 50 characters."]
    },
    email: {
        type: String,
        required: [true, 
            "Email is required"
        ],
        match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i,
            "Invalid Email Address"],
    },
    message: {
        type: String,
        required: [true, "Message is required."],
      },
    
      date: {
        type: Date,
        default: Date.now,
      },

})

const Contact = mongoose.models.Contact || mongoose.model("Contact",
contactSchema);

export default Contact;