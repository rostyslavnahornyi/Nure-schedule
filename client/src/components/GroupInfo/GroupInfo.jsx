import React, { useState } from "react";
import "./style.scoped.scss";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Modal from "../Modal/Modal";
import GroupInfoModal from "../GroupInfoModal/GroupInfoModal";

const GroupInfo = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const clickHandler = (e) => {
        setIsOpenModal(true);
    };

    return (
        <>
            <Modal active={isOpenModal} setActive={setIsOpenModal}>
                {isOpenModal ? <GroupInfoModal /> : null}
            </Modal>

            <InfoOutlinedIcon className="icon" onClick={clickHandler} />
        </>
    );
};

export default GroupInfo;
