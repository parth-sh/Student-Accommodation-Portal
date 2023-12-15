const Modal = (props) => {
    return (
        <dialog id={props.id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box p-0">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2">✕</button>
                </form>
                {props.children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default Modal;