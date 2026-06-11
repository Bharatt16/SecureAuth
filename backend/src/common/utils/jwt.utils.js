import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const generateAccessToken = (payload) =>{
    //something like - Generated Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzExOTE2NDAwLCJleHAiOjE3MTE5MjAwMDB9.EXAMPLE_SIGNATURE_DATA
    return jwt.sign(payload , process.env.JWT_ACCESS_SECRET,{
        expiresIn : process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    } );
};

const verifyAccessToken = (token) =>{
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    //it return the decoded token 
}

const generateRefreshToken = (payload) =>{
    return jwt.sign(payload , process.env.JWT_REFRESH_SECRET,{
        expiresIn: process.env.JWT_REFRESH_IN || "7d"
    })
}

const verifyRefreshToken = (token) =>{
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET)
}

const generateResetToken = () =>{
    //Genereaate random tokens
    const rawToken = crypto.randomBytes(32).toString("hex");
    //HAshes it
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    return { rawToken , hashedToken}
                                
}

export {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    generateResetToken
}