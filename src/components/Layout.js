import { Fragment } from "react";
import MainNavigation from "./MainNavigation";

function Layout(props){
    
    return (
        <Fragment >
            <MainNavigation/>
            <main style={{backgroundColor: '#FBFCFC'}}>{props.children}</main>
        </Fragment>
    );
}

export default Layout;