import React from "react";
import withLoaderData from "../../../lib/withLoaderData.js";

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <h1>DASHBOARD</h1>
                <code style={{color: 'white'}}>
                    {`${JSON.stringify(this.props.loaderData)}`}
                </code>
            </div>
        )
    }

}

export default withLoaderData(Dashboard);