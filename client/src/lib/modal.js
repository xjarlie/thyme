import ReactDOM from 'react-dom/client';
import styles from "../css/Modal.module.css";

let root;
function initial() {
    root = ReactDOM.createRoot(
        document.querySelector('#modalroot')
    )
}
initial();

function createModal(Modal) {

    const modal = (<div className={styles.wrapper}><Modal /></div>);

    if (root._internalRoot === null) {
        root = ReactDOM.createRoot(
            document.querySelector('#modalroot')
        )
    }

    root.render(modal);
    
    return modal;
}

function closeModal() {
    root.unmount();
}

export { createModal, closeModal };