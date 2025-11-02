import bcrypt from "bcryptjs"


const encrypt = (data : string):string=> {
   return bcrypt.hashSync(data,10);
}

const compare = (data:string,hashedData:string):boolean=>{
   return bcrypt.compareSync(data,hashedData);
}

export default {
   encrypt,
   compare
}