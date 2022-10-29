import React from "react";
import withLoaderData from "../../../lib/withLoaderData";
import { get } from "../../../lib/fetch.js";

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
    const { json } = await get('/user/details');
    return json;
}

export default withLoaderData(Dashboard);
export { loader };