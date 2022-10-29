import React from "react";
import withLoaderData from "../../../lib/withLoaderData";
import { global } from "../../../lib/global.js";

class Dashboard extends React.Component {
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
    return await fetch(`${global.serverAddr}/user/details`, {
        credentials: 'include'
    });
}

export default withLoaderData(Dashboard);
export { loader };