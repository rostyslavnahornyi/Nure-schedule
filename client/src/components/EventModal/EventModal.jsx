import React from "react";
import { useSelector } from "react-redux";
import { pairNames } from "../../constants";
import "./style.scoped.scss";

const EventModal = ({ data }) => {
    const state = useSelector((store) => store.data);

    const titleFull = data.subject_id.title;
    const title = data.subject_id.brief;
    const type = pairNames.find((obj) => obj.value === +data.type.toString()[0])
        .name;
    const groups = data.groups.map(
        (groupId) =>
            state.events.groups.find((group) => group.id === groupId).name
    );
    const teachers = data.teachers.map((teacherId) =>
        state.events.teachers.find((teacher) => teacher.id === teacherId)
    );

    return (
        <div className="wrapper">
            <p className="title">{titleFull}</p>
            <p className="desc">
                {title} — {type}
            </p>
            <p className="auditory">Аудитория: {data.auditory}</p>
            <div className="groups">
                Группы:
                {
                    <ul>
                        {[...new Set(groups)].map((groupName, index) => (
                            <li key={index}>{groupName}</li>
                        ))}
                    </ul>
                }
            </div>
            <div className="teachers">
                Учителя:
                {
                    <ul>
                        {teachers.map(({ full_name, short_name }, index) => (
                            <li key={index}>
                                {full_name} &#160;| &#160;{short_name}
                            </li>
                        ))}
                    </ul>
                }
            </div>
        </div>
    );
};

export default EventModal;
