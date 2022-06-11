import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../redux/actions/creators/group";

import Modal from "../Modal/Modal";
import Accordion from "../Accordion/Accordion";
import AddGroupModal from "../AddGroupModal/AddGroupModal";
import MyGroupsModal from "../MyGroupsModal/MyGroupsModal";

import "./style.scss";

const Navbar = () => {
    const dispatch = useDispatch();
    const store = useSelector((state) => state.group);
    const [isOpenedGroupList, setIsOpenedGroupList] = useState(false);
    const [isOpenedMyGroups, setIsOpenedMyGroups] = useState(false);

    return (
        <nav className="navbar">
            <Modal active={isOpenedGroupList} setActive={setIsOpenedGroupList}>
                <AddGroupModal />
            </Modal>

            <Modal active={isOpenedMyGroups} setActive={setIsOpenedMyGroups}>
                <MyGroupsModal />
            </Modal>

            <div className="buttons">
                <div className="button">
                    <p>Add group</p>
                    <div
                        className="icon-plus"
                        onClick={() => {
                            setIsOpenedGroupList(true);
                            if (!store.allGroups.length) {
                                dispatch(getGroups());
                            }
                        }}
                    >
                        <span>+</span>
                    </div>
                </div>

                <div className="button">
                    <p
                        className="clickable"
                        onClick={() => setIsOpenedMyGroups(true)}
                    >
                        My groups ({store.myGroups.length})
                    </p>
                </div>
            </div>

            <Accordion />
        </nav>
    );
};

export default Navbar;
