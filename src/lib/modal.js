import ReactDOM from 'react-dom/client';
import styles from "../css/Modal.module.css";

let root;
function initial() {
    root = ReactDOM.createRoot(
        document.querySelector('#modalroot')
    )
}
initial();

function createModal(Modal, props={}) {

    const modal = (<div className={styles.wrapper} onClick={closeModal}><Modal onClick={(e) => {e.stopPropagation()}} {...props} /></div>);

    if (root._internalRoot === null) {
        root = ReactDOM.createRoot(
            document.querySelector('#modalroot')
        )
    }

    root.render(modal);
    
    return modal;
}

function closeModal() {

    document.querySelector('#modalroot').firstChild.firstChild.classList.add(styles.closing);
    setTimeout(() => {
        root.unmount();
    }, 50)
    
}

export { createModal, closeModal };