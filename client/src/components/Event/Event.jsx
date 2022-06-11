import React, { useRef, useEffect, useState } from "react";
import { defaultPairColors } from "../../constants";
import styles from "./style.module.css";
import Modal from "../Modal/Modal";
import EventModal from "../EventModal/EventModal";

const Event = ({ data }) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const ref = useRef(null);
    const colorTypeIndex = +data.type.toString()[0];

    useEffect(() => {
        if (Number.isInteger(colorTypeIndex)) {
            ref?.current?.style.setProperty(
                "--main-color",
                defaultPairColors[colorTypeIndex]
            );
        }
    }, []);

    const clickEventHandler = (e) => {
        setIsOpenModal(true);
    };

    return (
        <>
            <Modal active={isOpenModal} setActive={setIsOpenModal}>
                {isOpenModal ? <EventModal data={data} /> : null}
            </Modal>

            <div ref={ref} className={styles.event} onClick={clickEventHandler}>
                {data.subject_id.brief}
            </div>
        </>
    );
};

export default Event;
