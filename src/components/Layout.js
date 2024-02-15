import { Fragment } from "react";
import MainNavigation from "./MainNavigation";
import classes from './Layout.module.css';

function Layout(props){
    
    return (
        // <Fragment >
        <div style={{width: '100%', height: '100%'}}>
            <MainNavigation />
            <main style={{ width: '100%', height: '100%', marginTop: '6rem'}}>{props.children}</main>
        </div>
        // </Fragment>
    );
}

export default Layout;

// '#FBFCFC'