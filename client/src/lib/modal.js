import ReactDOM from 'react-dom/client';
import styles from "../css/Modal.module.css";

let root;
function initial() {
    root = ReactDOM.createRoot(
        document.querySelector('#modalroot')
    )
}
initial();

function createModal(props) {

    const modal = (<div className={styles.modal} id={Math.random()}>hello world</div>);

    if (root._internalRoot === null) {
        root = ReactDOM.createRoot(
            document.querySelector('#modalroot')
        )
    }

    const random = Math.random();
    if (random > 0.5) {
        console.log('remopving', root)
        
        root.unmount();
    } else {
        console.log('adding', root)
        
        root.render(modal);
    }

    
    return modal;
}

export default createModal;