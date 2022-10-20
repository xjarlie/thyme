import React from "react";
import withLoaderData from "../../../lib/withLoaderData";
import createModal from "../../../lib/modal";
import Cookies from 'js-cookie';

class Dashboard extends React.Component {

    buttonClick() {
        console.log(createModal({title: 'helloworld'}));
    }

    render() {
        return (
            <div>
                <h1>DASHBOARD</h1>
                <code style={{color: 'white'}}>
                    {`${JSON.stringify(this.props.loaderData)}`}
                </code>
                <button type="button" onClick={this.buttonClick}>Create modal</button>
            </div>
        )
    }

}

async function loader() {
    const userID = Cookies.get('AUTH_ID');
    console.log(Cookies.get());
    return await fetch(`http://localhost:4000/user/${userID}/details`);
}

export default withLoaderData(Dashboard);
export { loader };