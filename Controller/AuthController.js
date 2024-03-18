import User from "../Model/userSchema.js";

import bcrypt, { compare } from "bcrypt";

export const registerUser = async (req,res)=>{
    const {username,email,password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);

    try {
        
        const newUser = new User({
            username,
            email,
            password: hashedPass
        })
        newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        console.log('Error creating user',error);
    }

}



export const LoginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ username: username }); // Use the User model
        if (foundUser) {
            const validate = await bcrypt.compare(password,foundUser.password); // Ensure bcrypt is imported

            validate ? res.status(200).json(foundUser) : res.status(400).json("Invalid Password");
        } else {
            res.status(404).json('No User Found');
        }
    } catch (error) {
        console.error("Error in logging", error);
        res.status(500).json({ message: "Internal server error" }); // Handle internal server error
    }
}
