import { useLoaderData } from 'react-router-dom';

function withLoaderData(Component) {
    function WrappedComponent(props) {
        let loaderData = useLoaderData();
        return <Component {...props} loaderData={loaderData} />
    }
    return WrappedComponent;
}

export default withLoaderData;