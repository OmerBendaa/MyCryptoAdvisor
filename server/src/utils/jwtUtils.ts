import jwt from 'jsonwebtoken';
const sign = (data:any) =>{
    return jwt.sign(data,process.env.JWT_SECRET as string,{expiresIn:'1h'});
}
const verify = (token:string) =>{
    return jwt.verify(token,process.env.JWT_SECRET as string);
}
const decode = (token:string) =>{
    return jwt.decode(token);
}
export default {
    sign,
    verify,
    decode
};
