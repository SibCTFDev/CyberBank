import {useState} from "react";
import ProductDataModal from "./ProductDataModal";
import CommentsModal from "./CommentsModal";


function ProductModal(props) {
    const {product, userName, closeModal, refreshInfo} = props;
    const [commentsOpen, setCommentsOpen] = useState(false);

    const openComments = () => setCommentsOpen(true);
    const closeComments = () => setCommentsOpen(false);

    if (!product) return null;

    const modalContent = commentsOpen ? (
        <CommentsModal
            pid={product.id}
            comments={product.comments}
            refreshInfo={refreshInfo}
            closeComments={closeComments}
        />
    ) : (
        <ProductDataModal 
            product={product}
            userName={userName}
            closeModal={closeModal}
            refreshInfo={refreshInfo}
            openComments={openComments}
        />
    )

    return modalContent;
}

export default ProductModal;
