import React from "react";
import withLoaderData from "../../../lib/withLoaderData";
import createModal from "../../../lib/modal";

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

export default withLoaderData(Dashboard);