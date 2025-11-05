import classes from './Loader.module.css';
import { ReactNode } from 'react';

type LoaderProps = {
    isLoading:boolean
    children:ReactNode
}
const Loader=({isLoading,children}:LoaderProps)=>{
   return isLoading ? <div className={classes.loader}></div>:<>{children}</>
}
export default Loader